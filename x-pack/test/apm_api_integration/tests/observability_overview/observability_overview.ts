/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { service, timerange } from '@elastic/apm-generator';
import expect from '@kbn/expect';
import { meanBy, sumBy } from 'lodash';
import { FtrProviderContext } from '../../common/ftr_provider_context';
import { registry } from '../../common/registry';
import { PromiseReturnType } from '../../../../plugins/observability/typings/common';
import { roundNumber } from '../../utils';

export default function ApiTest({ getService }: FtrProviderContext) {
  const apmApiClient = getService('apmApiClient');

  const traceData = getService('traceData');

  const start = new Date('2021-01-01T00:00:00.000Z').getTime();
  const end = new Date('2021-01-01T00:15:00.000Z').getTime() - 1;
  const intervalString = '60s';
  const bucketSize = 60;

  async function getThroughputValues() {
    const commonQuery = { start: new Date(start).toISOString(), end: new Date(end).toISOString() };
    const [serviceInventoryAPIResponse, observabilityOverviewAPIResponse] = await Promise.all([
      apmApiClient.readUser({
        endpoint: 'GET /api/apm/services',
        params: {
          query: {
            ...commonQuery,
            environment: 'ENVIRONMENT_ALL',
            kuery: '',
          },
        },
      }),
      apmApiClient.readUser({
        endpoint: `GET /api/apm/observability_overview`,
        params: {
          query: {
            ...commonQuery,
            bucketSize,
            intervalString,
          },
        },
      }),
    ]);
    const serviceInventoryThroughputSum = sumBy(
      serviceInventoryAPIResponse.body.items,
      'throughput'
    );

    return {
      serviceInventoryCount: serviceInventoryAPIResponse.body.items.length,
      serviceInventoryThroughputSum,
      observabilityOverview: observabilityOverviewAPIResponse.body,
    };
  }

  registry.when(
    'Observability overview when data is not loaded',
    { config: 'basic', archives: [] },
    () => {
      describe('when data is not loaded', () => {
        it('handles the empty state', async () => {
          const response = await apmApiClient.readUser({
            endpoint: `GET /api/apm/observability_overview`,
            params: {
              query: {
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString(),
                bucketSize,
                intervalString,
              },
            },
          });
          expect(response.status).to.be(200);

          expect(response.body.serviceCount).to.be(0);
          expect(response.body.transactionPerMinute.timeseries.length).to.be(0);
        });
      });
    }
  );

  registry.when('data is loaded', { config: 'basic', archives: ['apm_8.0.0_empty'] }, () => {
    describe('Observability overview api ', () => {
      before(async () => {
        const GO_PROD_RATE = 10;
        const GO_DEV_RATE = 5;
        const JAVA_PROD_RATE = 20;

        const serviceGoProdInstance = service('synth-go', 'production', 'go').instance(
          'instance-a'
        );
        const serviceGoDevInstance = service('synth-go', 'development', 'go').instance(
          'instance-b'
        );
        const serviceJavaInstance = service('synth-java', 'production', 'java').instance(
          'instance-c'
        );

        await traceData.index([
          ...timerange(start, end)
            .interval('1s')
            .rate(GO_PROD_RATE)
            .flatMap((timestamp) =>
              serviceGoProdInstance
                .transaction('GET /api/product/list')
                .duration(1000)
                .timestamp(timestamp)
                .serialize()
            ),
          ...timerange(start, end)
            .interval('1s')
            .rate(GO_DEV_RATE)
            .flatMap((timestamp) =>
              serviceGoDevInstance
                .transaction('GET /api/product/:id')
                .duration(1000)
                .timestamp(timestamp)
                .serialize()
            ),
          ...timerange(start, end)
            .interval('1s')
            .rate(JAVA_PROD_RATE)
            .flatMap((timestamp) =>
              serviceJavaInstance
                .transaction('POST /api/product/buy')
                .duration(1000)
                .timestamp(timestamp)
                .serialize()
            ),
        ]);
      });

      after(() => traceData.clean());

      describe('compare throughput values', () => {
        let throughputValues: PromiseReturnType<typeof getThroughputValues>;
        before(async () => {
          throughputValues = await getThroughputValues();
        });

        it('returns same number of service as shown on service inventory API', () => {
          const { serviceInventoryCount, observabilityOverview } = throughputValues;
          expect(serviceInventoryCount).to.equal(observabilityOverview.serviceCount);
        });

        it('returns same throughput value on service inventory and obs throughput count', () => {
          const { serviceInventoryThroughputSum, observabilityOverview } = throughputValues;
          const obsThroughputCount = observabilityOverview.transactionPerMinute.value;
          [serviceInventoryThroughputSum, obsThroughputCount].every(
            (value) => roundNumber(value) === '2100'
          );
        });

        it('returns same throughput value on service inventory and obs mean throughput timeseries', () => {
          const { serviceInventoryThroughputSum, observabilityOverview } = throughputValues;
          const obsThroughputMean = meanBy(
            observabilityOverview.transactionPerMinute.timeseries,
            'y'
          );
          [serviceInventoryThroughputSum, obsThroughputMean].every(
            (value) => roundNumber(value) === '2100'
          );
        });
      });
    });
  });
}
