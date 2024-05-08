/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { errors } from '@elastic/elasticsearch';
import { ElasticsearchClient, Logger } from '@kbn/core/server';
import { LogsDataAccessPluginStart } from '@kbn/logs-data-access-plugin/server';
import { WrappedElasticsearchClientError } from '@kbn/observability-plugin/server';
import { APMEventClient } from '../../../lib/helpers/create_es_client/create_apm_event_client';
import { AssetsESClient } from '../../../lib/helpers/create_es_client/create_assets_es_client/create_assets_es_clients';
import { withApmSpan } from '../../../utils/with_apm_span';
import { getAssets } from '../get_assets';
import { getServicesTransactionStats } from './get_services_transaction_stats';
import { ServiceAssetDocument } from './types';

export const MAX_NUMBER_OF_SERVICES = 1_000;

export async function getServiceAssets({
  assetsESClient,
  start,
  end,
  kuery,
  logger,
  apmEventClient,
  logsDataAccessStart,
  esClient,
}: {
  assetsESClient: AssetsESClient;
  start: number;
  end: number;
  kuery: string;
  logger: Logger;
  apmEventClient: APMEventClient;
  logsDataAccessStart: LogsDataAccessPluginStart;
  esClient: ElasticsearchClient;
}) {
  return withApmSpan('get_service_assets', async () => {
    try {
      const response = await getAssets({
        assetsESClient,
        start,
        end,
        kuery,
        size: MAX_NUMBER_OF_SERVICES,
        assetType: 'service',
      });

      const services = response.hits.hits.map((hit) => {
        const serviceAsset = hit._source as ServiceAssetDocument;

        return {
          asset: {
            signalTypes: serviceAsset.asset.signalTypes,
            identifyingMetadata: serviceAsset.asset.identifying_metadata,
          },
          service: {
            name: serviceAsset.service.name,
            environment: serviceAsset.service.environment,
          },
        };
      });

      const tracesServiceNames = services
        .filter(({ asset }) => asset.signalTypes['asset.traces'])
        .map(({ service }) => service.name);
      const logsServiceNames = services
        .filter(({ asset }) => asset.signalTypes['asset.logs'])
        .map(({ service }) => service.name);

      const [apmMetrics, logsMetrics] = await Promise.all([
        getServicesTransactionStats({
          apmEventClient,
          start,
          end,
          kuery,
          serviceNames: tracesServiceNames,
        }),
        logsDataAccessStart.services.getLogsRatesService({
          esClient,
          identifyingMetadata: 'service.name',
          timeFrom: start,
          timeTo: end,
          serviceNames: logsServiceNames,
        }),
      ]);

      return services.map((item) => ({
        ...item,
        metrics: { ...apmMetrics[item.service.name], ...logsMetrics[item.service.name] },
      }));
    } catch (error) {
      // If the index does not exist, handle it gracefully
      if (
        error instanceof WrappedElasticsearchClientError &&
        error.originalError instanceof errors.ResponseError
      ) {
        const type = error.originalError.body.error.type;

        if (type === 'index_not_found_exception') {
          logger.error(`Asset index does not exist. Unable to fetch services.`);
          return [];
        }
      }

      throw error;
    }
  });
}
