/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import styled from 'styled-components';
import { EuiPage, EuiPageBody, EuiSpacer, EuiPageProps } from '@elastic/eui';
import { Header } from '../header/index';

const getPaddingSize = (props: EuiPageProps) => (props.restrictWidth ? 0 : '24px');

const Page = styled(EuiPage)<EuiPageProps>`
  background: transparent;
  padding-right: ${getPaddingSize};
  padding-left: ${getPaddingSize};
`;

const Container = styled.div<{ color?: string }>`
  overflow-y: hidden;
  min-height: calc(100vh - ${(props) => props.theme.eui.euiHeaderChildSize});
  background: ${(props) => props.color};
`;

interface Props {
  headerColor: string;
  bodyColor: string;
  children?: React.ReactNode;
  restrictWidth?: number;
  showAddData?: boolean;
}

export const WithHeaderLayout = ({
  headerColor,
  bodyColor,
  children,
  restrictWidth,
  showAddData,
}: Props) => (
  <Container color={bodyColor}>
    <Header color={headerColor} restrictWidth={restrictWidth} showAddData={showAddData} />
    <Page restrictWidth={restrictWidth}>
      <EuiPageBody>{children}</EuiPageBody>
    </Page>
  </Container>
);
