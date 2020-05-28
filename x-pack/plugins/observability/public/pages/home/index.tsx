/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  EuiButton,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiIcon,
  EuiImage,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ISection, Section } from './Section';
import { CoreStart } from '../../../../../../src/core/public';

const appsSection: ISection[] = [
  {
    id: 'logs',
    title: 'Logs',
    icon: 'logoLogging',
    description:
      'The Elastic Stack (sometimes known as the ELK Stack) is the most popular open source logging platform.',
  },
  {
    id: 'apm',
    title: 'APM',
    icon: 'logoAPM',
    description:
      'See exactly where your application is spending time so you can quickly fix issues and feel good about the code you push.',
  },
  {
    id: 'metrics',
    title: 'Metrics',
    icon: 'logoMetrics',
    description:
      'Already using the Elastic Stack for logs? Add metrics in just a few steps and correlate metrics and logs in one place.',
  },
  {
    id: 'uptime',
    title: 'Uptime',
    icon: 'logoUptime',
    description:
      'React to availability issues across your apps and services before they affect users.',
  },
];

const tryItOutItemsSection: ISection[] = [
  {
    id: 'demo',
    title: 'Demo Playground',
    icon: 'play',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna at neque dictum.',
    href: 'https://demo.elastic.co/',
  },
  {
    id: 'sampleData',
    title: 'Add sample data',
    icon: 'documents',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna at neque dictum.',
    href: '/app/home#/tutorial_directory/sampleData',
  },
];

const FixedContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const CentralizedContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const TitleContainer = styled(CentralizedContainer)`
  height: 124px;
  display: flex;
  align-items: center;
`;

const BodyContainer = styled.div`
  background-color: #fff;
  height: 100%;
  box-shadow: 0 2px 2px -1px rgba(152, 162, 179, 0.3),
    0 1px 5px -2px rgba(152, 162, 179, 0.3);
  border: 1px solid #d3dae6;
`;

interface Props {
  core: CoreStart;
}

export const Home = ({ core }: Props) => {
  useEffect(() => {
    core.chrome.setBreadcrumbs([
      {
        text: i18n.translate('observability.home.breadcrumb.observability', {
          defaultMessage: 'Observability',
        }),
      },
      {
        text: i18n.translate('observability.home.breadcrumb.gettingStarted', {
          defaultMessage: 'Getting started',
        }),
      },
    ]);
  }, [core.chrome]);
  return (
    <FixedContainer>
      <TitleContainer>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiIcon type="logoObservability" size="xxl" />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="m">
              <h1>
                {i18n.translate('observability.home.title', {
                  defaultMessage: 'Observability',
                })}
              </h1>
            </EuiTitle>
          </EuiFlexItem>
        </EuiFlexGroup>
      </TitleContainer>
      <BodyContainer>
        <CentralizedContainer>
          <EuiSpacer size="xl" />
          <EuiFlexGroup direction="column">
            {/* title and description */}
            <EuiFlexItem style={{ maxWidth: 567 }}>
              <EuiTitle size="s">
                <h2>
                  {i18n.translate('observability.home.sectionTitle', {
                    defaultMessage: 'Observability built on the Elastic Stack',
                  })}
                </h2>
              </EuiTitle>
              <EuiSpacer size="m" />
              <EuiText size="s" color="subdued">
                {i18n.translate('observability.home.sectionsubtitle', {
                  defaultMessage:
                    'Bring your logs, metrics, and APM traces together at scale in a single stack so you can monitor and react to events happening anywhere in your environment.',
                })}
              </EuiText>
            </EuiFlexItem>

            {/* Apps sections */}
            <EuiFlexItem>
              <EuiSpacer size="s" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFlexGrid columns={2}>
                    {appsSection.map((app) => (
                      <Section section={app} key={app.id} />
                    ))}
                  </EuiFlexGrid>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiImage
                    size="xl"
                    alt="observability overview image"
                    url="/plugins/observability/assets/observability-overview.png"
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>

            {/* Get started button */}
            <EuiFlexItem>
              <EuiFlexGroup justifyContent="center" gutterSize="none">
                <EuiFlexItem grow={false}>
                  <EuiButton
                    fill
                    iconType="sortRight"
                    iconSide="right"
                    style={{ width: 175 }}
                    href="/app/home#/tutorial_directory/logging"
                  >
                    {i18n.translate('observability.home.getStatedButton', {
                      defaultMessage: 'Get started',
                    })}
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>

            <EuiHorizontalRule margin="xl" />

            {/* Try it out */}
            <EuiFlexItem>
              <EuiFlexGroup justifyContent="center">
                <EuiFlexItem grow={false}>
                  <EuiTitle size="s">
                    <h3>
                      {i18n.translate('observability.home.tryItOut', {
                        defaultMessage: 'Try it out',
                      })}
                    </h3>
                  </EuiTitle>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>

            {/* Try it out sections */}
            <EuiFlexItem>
              <EuiFlexGroup justifyContent="center">
                {tryItOutItemsSection.map((item) => (
                  <EuiFlexItem
                    grow={false}
                    key={item.id}
                    style={{ width: 260 }}
                  >
                    <EuiPanel hasShadow paddingSize="s">
                      <Section section={item} />
                    </EuiPanel>
                  </EuiFlexItem>
                ))}
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </CentralizedContainer>
      </BodyContainer>
    </FixedContainer>
  );
};
