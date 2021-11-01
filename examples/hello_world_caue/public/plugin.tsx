/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';

export class HelloWorldCauePlugin implements Plugin {
  public setup(core: CoreSetup) {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'helloWorldCaue',
      title: 'Hello World Caue',
      async mount({ element }: AppMountParameters) {
        ReactDOM.render(<div>Hello World Caue!</div>, element);
        return () => ReactDOM.unmountComponentAtNode(element);
      },
    });
  }
  public start(core: CoreStart) {
    return {};
  }
  public stop() {}
}
