/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import styled from 'styled-components';
import { usePluginContext } from '../../hooks/use_plugin_context';

export interface ISection {
  id: string;
  title: string;
  icon: string;
  description: string;
  href?: string;
  target?: '_blank';
}

const Link = styled(EuiButtonEmpty)`
  height: auto;
  &:focus {
    background-color: transparent;
  }
  &:hover {
    .title {
      text-decoration: underline;
    }
  }
`;

const Icon = styled(EuiIcon)`
  color: ${(props) => props.theme.eui.euiIconColors.text};
`;

export const Section = ({ section }: { section: ISection }) => {
  const { core } = usePluginContext();
  const { id, icon, title, description, href } = section;

  const sectionContent = (
    <EuiFlexGroup gutterSize="m">
      <EuiFlexItem grow={false}>
        <Icon type={icon} size="l" />
      </EuiFlexItem>
      <EuiFlexItem style={{ textAlign: 'left' }}>
        <EuiTitle size="xs" className="title">
          <h3>
            {i18n.translate(`observability.section.${id}.title`, {
              defaultMessage: title,
            })}
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        {description && (
          <EuiText size="s" style={{ whiteSpace: 'normal' }} color="default">
            {i18n.translate(`observability.section.${id}.description`, {
              defaultMessage: description,
            })}
          </EuiText>
        )}
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  if (href) {
    return (
      <EuiFlexItem>
        <Link
          target={section.target}
          href={core.http.basePath.prepend(href)}
          style={{ textDecoration: 'none' }}
        >
          {sectionContent}
        </Link>
      </EuiFlexItem>
    );
  }
  return <EuiFlexItem>{sectionContent}</EuiFlexItem>;
};
