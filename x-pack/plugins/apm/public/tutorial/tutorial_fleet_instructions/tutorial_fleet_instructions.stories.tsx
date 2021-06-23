/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/* eslint-disable react/function-component-definition */

import { Story } from '@storybook/react';
import React from 'react';
import { HttpStart } from 'kibana/public';
import TutorialFleetInstructions from '.';

interface Args {
  hasFleetPolicyWithApmIntegration: boolean;
}

function Wrapper({ hasFleetPolicyWithApmIntegration }: Args) {
  const http = ({
    get: () => ({ hasData: hasFleetPolicyWithApmIntegration }),
  } as unknown) as HttpStart;
  return (
    <TutorialFleetInstructions
      http={http}
      basePath="http://localhost:5601"
      isDarkTheme={false}
    />
  );
}

export default {
  title: 'app/Tutorial/FleetInstructions',
  component: TutorialFleetInstructions,
  argTypes: {
    hasFleetPolicyWithApmIntegration: {
      control: { type: 'inline-radio', options: [true, false] },
    },
  },
};

export const Instructions: Story<Args> = (_args) => {
  return <Wrapper {..._args} />;
};

Instructions.args = {
  hasFleetPolicyWithApmIntegration: true,
};
