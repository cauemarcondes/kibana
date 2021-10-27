/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
const getSynthtraceEsClient =
  require('../../synthtrace_es_client').getSynthtraceEsClient;

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on) => {
  on('task', {
    getClient({ esTarget, data }) {
      console.log('### caue ~ esTarget', esTarget);
      return new Promise(async (resolve, reject) => {
        try {
          const synthtraceEsClient = getSynthtraceEsClient(esTarget);
          console.log('######## injecting');
          await synthtraceEsClient.index(data);
          console.log('######## data injected');
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  });
};
