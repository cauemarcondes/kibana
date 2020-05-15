/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

export const data = {
  trace: {
    items: [
      {
        processor: {
          name: 'transaction',
          event: 'transaction'
        },
        '@timestamp': '2020-04-21T14:19:33.978Z',
        transaction: {
          duration: {
            us: 14765
          },
          name: 'DispatcherServlet#doGet',
          id: '14356c33f15f5045'
        },
        timestamp: {
          us: 1587478773978002
        }
      },
      {
        parent: {
          id: '9b7573017c59fbda'
        },
        processor: {
          event: 'transaction'
        },
        '@timestamp': '2020-04-21T14:19:33.982Z',
        transaction: {
          duration: {
            us: 9497
          },
          name: 'APIRestController#customers',
          id: '95f02881825841b7'
        },
        timestamp: {
          us: 1587478773982004
        }
      },
      {
        parent: {
          id: '14356c33f15f5045'
        },
        processor: {
          event: 'span'
        },
        '@timestamp': '2020-04-21T14:19:33.978Z',
        transaction: {
          id: '14356c33f15f5045'
        },
        span: {
          duration: {
            us: 11029
          },
          name: 'GET opbeans-java',
          id: '9b7573017c59fbda'
        },
        timestamp: {
          us: 1587478773978703
        }
      },
      {
        parent: {
          id: '9b7573017c59fbda'
        },
        processor: {
          event: 'span'
        },
        trace: {
          id: '62d4c2d110e692a5ac424a634c584db3'
        },
        '@timestamp': '2020-04-21T14:19:33.979Z',
        transaction: {
          id: '14356c33f15f5045'
        },
        timestamp: {
          us: 1587478773979060
        },
        span: {
          duration: {
            us: 9881
          },
          name: 'SimpleBufferingClientHttpRequest#executeInternal',
          id: 'c5493dc787898a0c'
        }
      },
      {
        parent: {
          id: '95f02881825841b7'
        },
        processor: {
          event: 'span'
        },
        '@timestamp': '2020-04-21T14:19:33.983Z',
        transaction: {
          id: '95f02881825841b7'
        },
        span: {
          duration: {
            us: 5292
          },
          name: 'ServletInvocableHandlerMethod#invokeAndHandle',
          id: '930fbec68327c77d'
        },
        timestamp: {
          us: 1587478773983769
        }
      },
      {
        parent: {
          id: '95f02881825841b7'
        },
        processor: {
          event: 'span'
        },
        trace: {
          id: '62d4c2d110e692a5ac424a634c584db3'
        },
        '@timestamp': '2020-04-21T14:19:33.983Z',
        transaction: {
          id: '95f02881825841b7'
        },
        timestamp: {
          us: 1587478773983758
        },
        span: {
          duration: {
            us: 1799
          },
          name: 'SELECT FROM customers',
          id: 'fdee0bbf8367470b'
        }
      },
      {
        parent: {
          id: '95f02881825841b7'
        },
        processor: {
          event: 'span'
        },
        trace: {
          id: '62d4c2d110e692a5ac424a634c584db3'
        },
        '@timestamp': '2020-04-21T14:19:33.982Z',
        transaction: {
          id: '95f02881825841b7'
        },
        timestamp: {
          us: 1587478773982568
        },
        span: {
          duration: {
            us: 409
          },
          name: 'empty query',
          id: '141f3d9cfb31c098'
        }
      }
    ],
    exceedsMax: false
  },
  errorsPerTransaction: {
    '14356c33f15f5045': 1
  }
};

export const data2 = {
  trace: {
    items: [
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        source: {
          ip: '172.18.0.7'
        },
        processor: {
          name: 'transaction',
          event: 'transaction'
        },
        url: {
          path: '/api/stats',
          scheme: 'http',
          port: 3000,
          domain: '172.18.0.6',
          full: 'http://172.18.0.6:3000/api/stats'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.702Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        http: {
          request: {
            headers: {
              Accept: ['*/*'],
              'User-Agent': ['Python/3.7 aiohttp/3.3.2'],
              Host: ['172.18.0.6:3000'],
              'Accept-Encoding': ['gzip, deflate']
            },
            method: 'get',
            socket: {
              encrypted: false,
              remote_address: '172.18.0.7'
            }
          },
          response: {
            status_code: 200,
            finished: true,
            headers_sent: false
          },
          version: '1.1'
        },
        client: {
          ip: '172.18.0.7'
        },
        user_agent: {
          original: 'Python/3.7 aiohttp/3.3.2',
          name: 'Other',
          device: {
            name: 'Other'
          }
        },
        transaction: {
          duration: {
            us: 17677
          },
          result: 'HTTP 2xx',
          name: 'DispatcherServlet#doGet',
          id: '1e4cb9e772ff5545',
          span_count: {
            dropped: 0,
            started: 1
          },
          type: 'request',
          sampled: true
        },
        timestamp: {
          us: 1587478738702002
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '0ce91689d556cdb8'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        source: {
          ip: '172.18.0.6'
        },
        processor: {
          name: 'transaction',
          event: 'transaction'
        },
        url: {
          path: '/api/stats',
          scheme: 'http',
          port: 3000,
          domain: 'opbeans-java',
          full: 'http://opbeans-java:3000/api/stats'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.704Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        http: {
          request: {
            headers: {
              Accept: [
                'text/plain, application/json, application/x-jackson-smile, application/cbor, application/*+json, */*'
              ],
              'User-Agent': ['Java/11.0.6'],
              Connection: ['keep-alive'],
              Host: ['opbeans-java:3000'],
              'Elastic-Apm-Traceparent': [
                '00-a32064e38da9007ea21396f3c1860230-0ce91689d556cdb8-01'
              ],
              Traceparent: [
                '00-a32064e38da9007ea21396f3c1860230-0ce91689d556cdb8-01'
              ]
            },
            method: 'get',
            socket: {
              encrypted: false,
              remote_address: '172.18.0.6'
            }
          },
          response: {
            status_code: 200,
            finished: true,
            headers_sent: false
          },
          version: '1.1'
        },
        client: {
          ip: '172.18.0.6'
        },
        transaction: {
          result: 'HTTP 2xx',
          duration: {
            us: 15925
          },
          name: 'DispatcherServlet#doGet',
          span_count: {
            dropped: 0,
            started: 1
          },
          id: '2c1256e3fb4911a5',
          type: 'request',
          sampled: true
        },
        user_agent: {
          original: 'Java/11.0.6',
          name: 'Java',
          device: {
            name: 'Spider'
          },
          version: '0.6.'
        },
        timestamp: {
          us: 1587478738704003
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '706574281ffdce3b'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        source: {
          ip: '172.18.0.6'
        },
        processor: {
          name: 'transaction',
          event: 'transaction'
        },
        url: {
          path: '/api/stats',
          scheme: 'http',
          port: 3000,
          domain: 'opbeans-java',
          full: 'http://opbeans-java:3000/api/stats'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.705Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        http: {
          request: {
            headers: {
              Accept: [
                'text/plain, application/json, application/x-jackson-smile, application/cbor, application/*+json, */*'
              ],
              'User-Agent': ['Java/11.0.6'],
              Connection: ['keep-alive'],
              Host: ['opbeans-java:3000'],
              'Elastic-Apm-Traceparent': [
                '00-a32064e38da9007ea21396f3c1860230-706574281ffdce3b-01'
              ],
              Traceparent: [
                '00-a32064e38da9007ea21396f3c1860230-706574281ffdce3b-01'
              ]
            },
            method: 'get',
            socket: {
              encrypted: false,
              remote_address: '172.18.0.6'
            }
          },
          response: {
            status_code: 200,
            finished: true,
            headers_sent: false
          },
          version: '1.1'
        },
        client: {
          ip: '172.18.0.6'
        },
        transaction: {
          duration: {
            us: 14042
          },
          result: 'HTTP 2xx',
          name: 'DispatcherServlet#doGet',
          id: '4c6747e9f329846e',
          span_count: {
            dropped: 0,
            started: 1
          },
          type: 'request',
          sampled: true
        },
        user_agent: {
          original: 'Java/11.0.6',
          name: 'Java',
          device: {
            name: 'Spider'
          },
          version: '0.6.'
        },
        timestamp: {
          us: 1587478738705002
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '826f3e9cb37e93d5'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        source: {
          ip: '172.18.0.6'
        },
        processor: {
          name: 'transaction',
          event: 'transaction'
        },
        url: {
          path: '/api/stats',
          scheme: 'http',
          port: 3000,
          domain: 'opbeans-java',
          full: 'http://opbeans-java:3000/api/stats'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.708Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        client: {
          ip: '172.18.0.6'
        },
        http: {
          request: {
            headers: {
              Accept: [
                'text/plain, application/json, application/x-jackson-smile, application/cbor, application/*+json, */*'
              ],
              'User-Agent': ['Java/11.0.6'],
              Connection: ['keep-alive'],
              Host: ['opbeans-java:3000'],
              'Elastic-Apm-Traceparent': [
                '00-a32064e38da9007ea21396f3c1860230-826f3e9cb37e93d5-01'
              ],
              Traceparent: [
                '00-a32064e38da9007ea21396f3c1860230-826f3e9cb37e93d5-01'
              ]
            },
            method: 'get',
            socket: {
              encrypted: false,
              remote_address: '172.18.0.6'
            }
          },
          response: {
            headers: {
              'Transfer-Encoding': ['chunked'],
              Date: ['Tue, 21 Apr 2020 14:18:58 GMT'],
              'Content-Type': ['application/json;charset=UTF-8']
            },
            status_code: 200,
            finished: true,
            headers_sent: true
          },
          version: '1.1'
        },
        user_agent: {
          original: 'Java/11.0.6',
          name: 'Java',
          device: {
            name: 'Spider'
          },
          version: '0.6.'
        },
        transaction: {
          duration: {
            us: 11068
          },
          result: 'HTTP 2xx',
          name: 'APIRestController#stats',
          span_count: {
            dropped: 0,
            started: 5
          },
          id: '32c40b60360867ec',
          type: 'request',
          sampled: true
        },
        timestamp: {
          us: 1587478738708002
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '1e4cb9e772ff5545'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        destination: {
          address: 'opbeans-java',
          port: 3000
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.702Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '1e4cb9e772ff5545'
        },
        timestamp: {
          us: 1587478738702586
        },
        span: {
          duration: {
            us: 16914
          },
          stacktrace: [
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'AbstractClientHttpRequest.java',
              classname:
                'org.springframework.http.client.AbstractClientHttpRequest',
              line: {
                number: 55
              },
              module: 'org.springframework.http.client',
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 723
              },
              module: 'org.springframework.web.client',
              function: 'doExecute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 680
              },
              function: 'execute',
              module: 'org.springframework.web.client'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 332
              },
              module: 'org.springframework.web.client',
              function: 'getForObject'
            },
            {
              library_frame: false,
              exclude_from_grouping: false,
              filename: 'DTInterceptor.java',
              classname: 'co.elastic.apm.opbeans.controllers.DTInterceptor',
              line: {
                number: 73
              },
              module: 'co.elastic.apm.opbeans.controllers',
              function: 'preHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HandlerExecutionChain.java',
              classname:
                'org.springframework.web.servlet.HandlerExecutionChain',
              line: {
                number: 136
              },
              module: 'org.springframework.web.servlet',
              function: 'applyPreHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              classname: 'org.springframework.web.servlet.DispatcherServlet',
              line: {
                number: 986
              },
              function: 'doDispatch',
              module: 'org.springframework.web.servlet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              classname: 'org.springframework.web.servlet.DispatcherServlet',
              line: {
                number: 925
              },
              function: 'doService',
              module: 'org.springframework.web.servlet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 974
              },
              module: 'org.springframework.web.servlet',
              function: 'processRequest'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 866
              },
              module: 'org.springframework.web.servlet',
              function: 'doGet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpServlet.java',
              classname: 'javax.servlet.http.HttpServlet',
              line: {
                number: 635
              },
              module: 'javax.servlet.http',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 851
              },
              module: 'org.springframework.web.servlet',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpServlet.java',
              classname: 'javax.servlet.http.HttpServlet',
              line: {
                number: 742
              },
              module: 'javax.servlet.http',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 231
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'WsFilter.java',
              classname: 'org.apache.tomcat.websocket.server.WsFilter',
              line: {
                number: 52
              },
              module: 'org.apache.tomcat.websocket.server',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              function: 'internalDoFilter',
              module: 'org.apache.catalina.core'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RequestContextFilter.java',
              classname: 'org.springframework.web.filter.RequestContextFilter',
              line: {
                number: 99
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpPutFormContentFilter.java',
              classname:
                'org.springframework.web.filter.HttpPutFormContentFilter',
              line: {
                number: 109
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HiddenHttpMethodFilter.java',
              classname:
                'org.springframework.web.filter.HiddenHttpMethodFilter',
              line: {
                number: 81
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              function: 'internalDoFilter',
              module: 'org.apache.catalina.core'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'CharacterEncodingFilter.java',
              classname:
                'org.springframework.web.filter.CharacterEncodingFilter',
              line: {
                number: 200
              },
              function: 'doFilterInternal',
              module: 'org.springframework.web.filter'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardWrapperValve.java',
              classname: 'org.apache.catalina.core.StandardWrapperValve',
              line: {
                number: 198
              },
              function: 'invoke',
              module: 'org.apache.catalina.core'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardContextValve.java',
              classname: 'org.apache.catalina.core.StandardContextValve',
              line: {
                number: 96
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AuthenticatorBase.java',
              classname: 'org.apache.catalina.authenticator.AuthenticatorBase',
              line: {
                number: 496
              },
              module: 'org.apache.catalina.authenticator',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardHostValve.java',
              classname: 'org.apache.catalina.core.StandardHostValve',
              line: {
                number: 140
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ErrorReportValve.java',
              classname: 'org.apache.catalina.valves.ErrorReportValve',
              line: {
                number: 81
              },
              function: 'invoke',
              module: 'org.apache.catalina.valves'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardEngineValve.java',
              classname: 'org.apache.catalina.core.StandardEngineValve',
              line: {
                number: 87
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'CoyoteAdapter.java',
              classname: 'org.apache.catalina.connector.CoyoteAdapter',
              line: {
                number: 342
              },
              module: 'org.apache.catalina.connector',
              function: 'service'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'Http11Processor.java',
              classname: 'org.apache.coyote.http11.Http11Processor',
              line: {
                number: 803
              },
              module: 'org.apache.coyote.http11',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractProcessorLight.java',
              classname: 'org.apache.coyote.AbstractProcessorLight',
              line: {
                number: 66
              },
              module: 'org.apache.coyote',
              function: 'process'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractProtocol.java',
              classname: 'org.apache.coyote.AbstractProtocol$ConnectionHandler',
              line: {
                number: 790
              },
              module: 'org.apache.coyote',
              function: 'process'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'NioEndpoint.java',
              classname:
                'org.apache.tomcat.util.net.NioEndpoint$SocketProcessor',
              line: {
                number: 1468
              },
              module: 'org.apache.tomcat.util.net',
              function: 'doRun'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'SocketProcessorBase.java',
              classname: 'org.apache.tomcat.util.net.SocketProcessorBase',
              line: {
                number: 49
              },
              module: 'org.apache.tomcat.util.net',
              function: 'run'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'TaskThread.java',
              classname:
                'org.apache.tomcat.util.threads.TaskThread$WrappingRunnable',
              line: {
                number: 61
              },
              module: 'org.apache.tomcat.util.threads',
              function: 'run'
            }
          ],
          subtype: 'http',
          name: 'GET opbeans-java',
          destination: {
            service: {
              resource: 'opbeans-java:3000',
              name: 'http://opbeans-java:3000',
              type: 'external'
            }
          },
          http: {
            response: {
              status_code: 200
            },
            url: {
              original: 'http://opbeans-java:3000/api/stats'
            }
          },
          id: '0ce91689d556cdb8',
          type: 'external'
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '2c1256e3fb4911a5'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        destination: {
          address: 'opbeans-java',
          port: 3000
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          type: 'apm-server',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.704Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '2c1256e3fb4911a5'
        },
        timestamp: {
          us: 1587478738704370
        },
        span: {
          duration: {
            us: 15300
          },
          stacktrace: [
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractClientHttpRequest.java',
              classname:
                'org.springframework.http.client.AbstractClientHttpRequest',
              line: {
                number: 55
              },
              module: 'org.springframework.http.client',
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 723
              },
              module: 'org.springframework.web.client',
              function: 'doExecute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 680
              },
              module: 'org.springframework.web.client',
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 332
              },
              module: 'org.springframework.web.client',
              function: 'getForObject'
            },
            {
              library_frame: false,
              exclude_from_grouping: false,
              filename: 'DTInterceptor.java',
              classname: 'co.elastic.apm.opbeans.controllers.DTInterceptor',
              line: {
                number: 73
              },
              module: 'co.elastic.apm.opbeans.controllers',
              function: 'preHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HandlerExecutionChain.java',
              classname:
                'org.springframework.web.servlet.HandlerExecutionChain',
              line: {
                number: 136
              },
              module: 'org.springframework.web.servlet',
              function: 'applyPreHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              classname: 'org.springframework.web.servlet.DispatcherServlet',
              line: {
                number: 986
              },
              module: 'org.springframework.web.servlet',
              function: 'doDispatch'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              classname: 'org.springframework.web.servlet.DispatcherServlet',
              line: {
                number: 925
              },
              module: 'org.springframework.web.servlet',
              function: 'doService'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 974
              },
              module: 'org.springframework.web.servlet',
              function: 'processRequest'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 866
              },
              module: 'org.springframework.web.servlet',
              function: 'doGet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpServlet.java',
              classname: 'javax.servlet.http.HttpServlet',
              line: {
                number: 635
              },
              module: 'javax.servlet.http',
              function: 'service'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 851
              },
              module: 'org.springframework.web.servlet',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpServlet.java',
              classname: 'javax.servlet.http.HttpServlet',
              line: {
                number: 742
              },
              module: 'javax.servlet.http',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 231
              },
              function: 'internalDoFilter',
              module: 'org.apache.catalina.core'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              function: 'doFilter',
              module: 'org.apache.catalina.core'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'WsFilter.java',
              classname: 'org.apache.tomcat.websocket.server.WsFilter',
              line: {
                number: 52
              },
              module: 'org.apache.tomcat.websocket.server',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RequestContextFilter.java',
              classname: 'org.springframework.web.filter.RequestContextFilter',
              line: {
                number: 99
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpPutFormContentFilter.java',
              classname:
                'org.springframework.web.filter.HttpPutFormContentFilter',
              line: {
                number: 109
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'HiddenHttpMethodFilter.java',
              classname:
                'org.springframework.web.filter.HiddenHttpMethodFilter',
              line: {
                number: 81
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'CharacterEncodingFilter.java',
              classname:
                'org.springframework.web.filter.CharacterEncodingFilter',
              line: {
                number: 200
              },
              function: 'doFilterInternal',
              module: 'org.springframework.web.filter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardWrapperValve.java',
              classname: 'org.apache.catalina.core.StandardWrapperValve',
              line: {
                number: 198
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardContextValve.java',
              classname: 'org.apache.catalina.core.StandardContextValve',
              line: {
                number: 96
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AuthenticatorBase.java',
              classname: 'org.apache.catalina.authenticator.AuthenticatorBase',
              line: {
                number: 496
              },
              function: 'invoke',
              module: 'org.apache.catalina.authenticator'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardHostValve.java',
              classname: 'org.apache.catalina.core.StandardHostValve',
              line: {
                number: 140
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ErrorReportValve.java',
              classname: 'org.apache.catalina.valves.ErrorReportValve',
              line: {
                number: 81
              },
              module: 'org.apache.catalina.valves',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardEngineValve.java',
              classname: 'org.apache.catalina.core.StandardEngineValve',
              line: {
                number: 87
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'CoyoteAdapter.java',
              classname: 'org.apache.catalina.connector.CoyoteAdapter',
              line: {
                number: 342
              },
              module: 'org.apache.catalina.connector',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'Http11Processor.java',
              classname: 'org.apache.coyote.http11.Http11Processor',
              line: {
                number: 803
              },
              module: 'org.apache.coyote.http11',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractProcessorLight.java',
              classname: 'org.apache.coyote.AbstractProcessorLight',
              line: {
                number: 66
              },
              module: 'org.apache.coyote',
              function: 'process'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractProtocol.java',
              classname: 'org.apache.coyote.AbstractProtocol$ConnectionHandler',
              line: {
                number: 790
              },
              module: 'org.apache.coyote',
              function: 'process'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'NioEndpoint.java',
              classname:
                'org.apache.tomcat.util.net.NioEndpoint$SocketProcessor',
              line: {
                number: 1468
              },
              module: 'org.apache.tomcat.util.net',
              function: 'doRun'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'SocketProcessorBase.java',
              classname: 'org.apache.tomcat.util.net.SocketProcessorBase',
              line: {
                number: 49
              },
              module: 'org.apache.tomcat.util.net',
              function: 'run'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'TaskThread.java',
              classname:
                'org.apache.tomcat.util.threads.TaskThread$WrappingRunnable',
              line: {
                number: 61
              },
              module: 'org.apache.tomcat.util.threads',
              function: 'run'
            }
          ],
          subtype: 'http',
          name: 'GET opbeans-java',
          destination: {
            service: {
              resource: 'opbeans-java:3000',
              name: 'http://opbeans-java:3000',
              type: 'external'
            }
          },
          http: {
            response: {
              status_code: 200
            },
            url: {
              original: 'http://opbeans-java:3000/api/stats'
            }
          },
          id: '706574281ffdce3b',
          type: 'external'
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '4c6747e9f329846e'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.705Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '4c6747e9f329846e'
        },
        span: {
          duration: {
            us: 13266
          },
          subtype: 'inferred',
          name: 'RestTemplate#doExecute',
          id: '7a8c4d96019b514d',
          type: 'app'
        },
        timestamp: {
          us: 1587478738705410
        },
        child: { id: ['826f3e9cb37e93d5'] }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '4c6747e9f329846e'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        destination: {
          address: 'opbeans-java',
          port: 3000
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.705Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '4c6747e9f329846e'
        },
        timestamp: {
          us: 1587478738705390
        },
        span: {
          duration: {
            us: 12966
          },
          stacktrace: [
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractClientHttpRequest.java',
              classname:
                'org.springframework.http.client.AbstractClientHttpRequest',
              line: {
                number: 55
              },
              module: 'org.springframework.http.client',
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 723
              },
              module: 'org.springframework.web.client',
              function: 'doExecute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 680
              },
              module: 'org.springframework.web.client',
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              classname: 'org.springframework.web.client.RestTemplate',
              line: {
                number: 332
              },
              function: 'getForObject',
              module: 'org.springframework.web.client'
            },
            {
              library_frame: false,
              exclude_from_grouping: false,
              filename: 'DTInterceptor.java',
              classname: 'co.elastic.apm.opbeans.controllers.DTInterceptor',
              line: {
                number: 73
              },
              module: 'co.elastic.apm.opbeans.controllers',
              function: 'preHandle'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'HandlerExecutionChain.java',
              classname:
                'org.springframework.web.servlet.HandlerExecutionChain',
              line: {
                number: 136
              },
              module: 'org.springframework.web.servlet',
              function: 'applyPreHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              classname: 'org.springframework.web.servlet.DispatcherServlet',
              line: {
                number: 986
              },
              module: 'org.springframework.web.servlet',
              function: 'doDispatch'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              classname: 'org.springframework.web.servlet.DispatcherServlet',
              line: {
                number: 925
              },
              module: 'org.springframework.web.servlet',
              function: 'doService'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 974
              },
              module: 'org.springframework.web.servlet',
              function: 'processRequest'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 866
              },
              module: 'org.springframework.web.servlet',
              function: 'doGet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpServlet.java',
              classname: 'javax.servlet.http.HttpServlet',
              line: {
                number: 635
              },
              module: 'javax.servlet.http',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 851
              },
              module: 'org.springframework.web.servlet',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpServlet.java',
              classname: 'javax.servlet.http.HttpServlet',
              line: {
                number: 742
              },
              module: 'javax.servlet.http',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 231
              },
              function: 'internalDoFilter',
              module: 'org.apache.catalina.core'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'WsFilter.java',
              classname: 'org.apache.tomcat.websocket.server.WsFilter',
              line: {
                number: 52
              },
              module: 'org.apache.tomcat.websocket.server',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RequestContextFilter.java',
              classname: 'org.springframework.web.filter.RequestContextFilter',
              line: {
                number: 99
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              function: 'doFilter',
              module: 'org.springframework.web.filter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              function: 'internalDoFilter',
              module: 'org.apache.catalina.core'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpPutFormContentFilter.java',
              classname:
                'org.springframework.web.filter.HttpPutFormContentFilter',
              line: {
                number: 109
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              function: 'doFilter',
              module: 'org.springframework.web.filter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HiddenHttpMethodFilter.java',
              classname:
                'org.springframework.web.filter.HiddenHttpMethodFilter',
              line: {
                number: 81
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              function: 'doFilter',
              module: 'org.springframework.web.filter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'CharacterEncodingFilter.java',
              classname:
                'org.springframework.web.filter.CharacterEncodingFilter',
              line: {
                number: 200
              },
              module: 'org.springframework.web.filter',
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              classname: 'org.springframework.web.filter.OncePerRequestFilter',
              line: {
                number: 107
              },
              module: 'org.springframework.web.filter',
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 193
              },
              module: 'org.apache.catalina.core',
              function: 'internalDoFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ApplicationFilterChain.java',
              classname: 'org.apache.catalina.core.ApplicationFilterChain',
              line: {
                number: 166
              },
              module: 'org.apache.catalina.core',
              function: 'doFilter'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'StandardWrapperValve.java',
              classname: 'org.apache.catalina.core.StandardWrapperValve',
              line: {
                number: 198
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardContextValve.java',
              classname: 'org.apache.catalina.core.StandardContextValve',
              line: {
                number: 96
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AuthenticatorBase.java',
              classname: 'org.apache.catalina.authenticator.AuthenticatorBase',
              line: {
                number: 496
              },
              module: 'org.apache.catalina.authenticator',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardHostValve.java',
              classname: 'org.apache.catalina.core.StandardHostValve',
              line: {
                number: 140
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'ErrorReportValve.java',
              classname: 'org.apache.catalina.valves.ErrorReportValve',
              line: {
                number: 81
              },
              module: 'org.apache.catalina.valves',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'StandardEngineValve.java',
              classname: 'org.apache.catalina.core.StandardEngineValve',
              line: {
                number: 87
              },
              module: 'org.apache.catalina.core',
              function: 'invoke'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'CoyoteAdapter.java',
              classname: 'org.apache.catalina.connector.CoyoteAdapter',
              line: {
                number: 342
              },
              module: 'org.apache.catalina.connector',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'Http11Processor.java',
              classname: 'org.apache.coyote.http11.Http11Processor',
              line: {
                number: 803
              },
              module: 'org.apache.coyote.http11',
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractProcessorLight.java',
              classname: 'org.apache.coyote.AbstractProcessorLight',
              line: {
                number: 66
              },
              module: 'org.apache.coyote',
              function: 'process'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'AbstractProtocol.java',
              classname: 'org.apache.coyote.AbstractProtocol$ConnectionHandler',
              line: {
                number: 790
              },
              module: 'org.apache.coyote',
              function: 'process'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'NioEndpoint.java',
              classname:
                'org.apache.tomcat.util.net.NioEndpoint$SocketProcessor',
              line: {
                number: 1468
              },
              module: 'org.apache.tomcat.util.net',
              function: 'doRun'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'SocketProcessorBase.java',
              classname: 'org.apache.tomcat.util.net.SocketProcessorBase',
              line: {
                number: 49
              },
              module: 'org.apache.tomcat.util.net',
              function: 'run'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'TaskThread.java',
              classname:
                'org.apache.tomcat.util.threads.TaskThread$WrappingRunnable',
              line: {
                number: 61
              },
              module: 'org.apache.tomcat.util.threads',
              function: 'run'
            }
          ],
          subtype: 'http',
          name: 'GET opbeans-java',
          destination: {
            service: {
              resource: 'opbeans-java:3000',
              name: 'http://opbeans-java:3000',
              type: 'external'
            }
          },
          http: {
            response: {
              status_code: 200
            },
            url: {
              original: 'http://opbeans-java:3000/api/stats'
            }
          },
          id: '826f3e9cb37e93d5',
          type: 'external'
        },
        child: { id: ['6da142b19393515a'] }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '706574281ffdce3b'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          type: 'apm-server',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.706Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '2c1256e3fb4911a5'
        },
        timestamp: {
          us: 1587478738706891
        },
        span: {
          duration: {
            us: 12223
          },
          stacktrace: [
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractBufferingClientHttpRequest.java',
              line: {
                number: -1
              },
              function: 'executeInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractClientHttpRequest.java',
              line: {
                number: -1
              },
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              line: {
                number: -1
              },
              function: 'doExecute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              line: {
                number: -1
              },
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              line: {
                number: -1
              },
              function: 'getForObject'
            },
            {
              library_frame: false,
              exclude_from_grouping: false,
              filename: 'DTInterceptor.java',
              line: {
                number: -1
              },
              function: 'preHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HandlerExecutionChain.java',
              line: {
                number: -1
              },
              function: 'applyPreHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              line: {
                number: -1
              },
              function: 'doDispatch'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              line: {
                number: -1
              },
              function: 'doService'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'FrameworkServlet.java',
              line: {
                number: -1
              },
              function: 'processRequest'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              line: {
                number: -1
              },
              function: 'doGet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              line: {
                number: -1
              },
              function: 'service'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RequestContextFilter.java',
              line: {
                number: -1
              },
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              line: {
                number: -1
              },
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpPutFormContentFilter.java',
              line: {
                number: -1
              },
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              line: {
                number: -1
              },
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HiddenHttpMethodFilter.java',
              line: {
                number: -1
              },
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              line: {
                number: -1
              },
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'CharacterEncodingFilter.java',
              line: {
                number: -1
              },
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              line: {
                number: -1
              },
              function: 'doFilter'
            }
          ],
          subtype: 'inferred',
          name: 'SimpleBufferingClientHttpRequest#executeInternal',
          id: 'c46e84ab26d74869',
          type: 'app'
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '0ce91689d556cdb8'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.706Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '1e4cb9e772ff5545'
        },
        span: {
          duration: {
            us: 12156
          },
          stacktrace: [
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractBufferingClientHttpRequest.java',
              line: {
                number: -1
              },
              function: 'executeInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractClientHttpRequest.java',
              line: {
                number: -1
              },
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              line: {
                number: -1
              },
              function: 'doExecute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              line: {
                number: -1
              },
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RestTemplate.java',
              line: {
                number: -1
              },
              function: 'getForObject'
            },
            {
              library_frame: false,
              exclude_from_grouping: false,
              filename: 'DTInterceptor.java',
              line: {
                number: -1
              },
              function: 'preHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HandlerExecutionChain.java',
              line: {
                number: -1
              },
              function: 'applyPreHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              line: {
                number: -1
              },
              function: 'doDispatch'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              line: {
                number: -1
              },
              function: 'doService'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              line: {
                number: -1
              },
              function: 'processRequest'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              line: {
                number: -1
              },
              function: 'doGet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              line: {
                number: -1
              },
              function: 'service'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'RequestContextFilter.java',
              line: {
                number: -1
              },
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              line: {
                number: -1
              },
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HttpPutFormContentFilter.java',
              line: {
                number: -1
              },
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              line: {
                number: -1
              },
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HiddenHttpMethodFilter.java',
              line: {
                number: -1
              },
              function: 'doFilterInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'OncePerRequestFilter.java',
              line: {
                number: -1
              },
              function: 'doFilter'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'CharacterEncodingFilter.java',
              line: {
                number: -1
              },
              function: 'doFilterInternal'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'OncePerRequestFilter.java',
              line: {
                number: -1
              },
              function: 'doFilter'
            }
          ],
          subtype: 'inferred',
          name: 'SimpleBufferingClientHttpRequest#executeInternal',
          id: 'eb474a9abf4994dc',
          type: 'app'
        },
        timestamp: {
          us: 1587478738706208
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '826f3e9cb37e93d5'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.706Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '4c6747e9f329846e'
        },
        timestamp: {
          us: 1587478738706449
        },
        span: {
          duration: {
            us: 10871
          },
          stacktrace: [
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractBufferingClientHttpRequest.java',
              line: {
                number: -1
              },
              function: 'executeInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractClientHttpRequest.java',
              line: {
                number: -1
              },
              function: 'execute'
            }
          ],
          subtype: 'inferred',
          name: 'SimpleBufferingClientHttpRequest#executeInternal',
          id: '665de4f8ba315883',
          type: 'app'
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '32c40b60360867ec'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          type: 'apm-server',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.712Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '32c40b60360867ec'
        },
        span: {
          duration: {
            us: 6102
          },
          subtype: 'inferred',
          name: 'DispatcherServlet#doDispatch',
          id: 'f3e8f283fd8975d3',
          type: 'app'
        },
        timestamp: {
          us: 1587478738712813
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '32c40b60360867ec'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        destination: {
          address: 'postgres',
          port: 5432
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          type: 'apm-server',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.712Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '32c40b60360867ec'
        },
        span: {
          duration: {
            us: 5006
          },
          stacktrace: [
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HikariProxyPreparedStatement.java',
              classname: 'com.zaxxer.hikari.pool.HikariProxyPreparedStatement',
              line: {
                number: -1
              },
              module: 'com.zaxxer.hikari.pool',
              function: 'executeQuery'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ResultSetReturnImpl.java',
              classname:
                'org.hibernate.engine.jdbc.internal.ResultSetReturnImpl',
              line: {
                number: 60
              },
              module: 'org.hibernate.engine.jdbc.internal',
              function: 'extract'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 2168
              },
              module: 'org.hibernate.loader',
              function: 'getResultSet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 1931
              },
              module: 'org.hibernate.loader',
              function: 'executeQueryStatement'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 1893
              },
              module: 'org.hibernate.loader',
              function: 'executeQueryStatement'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 938
              },
              module: 'org.hibernate.loader',
              function: 'doQuery'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 341
              },
              function: 'doQueryAndInitializeNonLazyCollections',
              module: 'org.hibernate.loader'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 2692
              },
              module: 'org.hibernate.loader',
              function: 'doList'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 2675
              },
              module: 'org.hibernate.loader',
              function: 'doList'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 2507
              },
              module: 'org.hibernate.loader',
              function: 'listIgnoreQueryCache'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'Loader.java',
              classname: 'org.hibernate.loader.Loader',
              line: {
                number: 2502
              },
              module: 'org.hibernate.loader',
              function: 'list'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'QueryLoader.java',
              classname: 'org.hibernate.loader.hql.QueryLoader',
              line: {
                number: 502
              },
              module: 'org.hibernate.loader.hql',
              function: 'list'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'QueryTranslatorImpl.java',
              classname: 'org.hibernate.hql.internal.ast.QueryTranslatorImpl',
              line: {
                number: 392
              },
              module: 'org.hibernate.hql.internal.ast',
              function: 'list'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'HQLQueryPlan.java',
              classname: 'org.hibernate.engine.query.spi.HQLQueryPlan',
              line: {
                number: 216
              },
              module: 'org.hibernate.engine.query.spi',
              function: 'performList'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'SessionImpl.java',
              classname: 'org.hibernate.internal.SessionImpl',
              line: {
                number: 1490
              },
              module: 'org.hibernate.internal',
              function: 'list'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractProducedQuery.java',
              classname: 'org.hibernate.query.internal.AbstractProducedQuery',
              line: {
                number: 1445
              },
              module: 'org.hibernate.query.internal',
              function: 'doList'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractProducedQuery.java',
              classname: 'org.hibernate.query.internal.AbstractProducedQuery',
              line: {
                number: 1414
              },
              module: 'org.hibernate.query.internal',
              function: 'list'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractProducedQuery.java',
              classname: 'org.hibernate.query.internal.AbstractProducedQuery',
              line: {
                number: 1463
              },
              module: 'org.hibernate.query.internal',
              function: 'getSingleResult'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'JpaQueryExecution.java',
              classname:
                'org.springframework.data.jpa.repository.query.JpaQueryExecution$SingleEntityExecution',
              line: {
                number: 214
              },
              module: 'org.springframework.data.jpa.repository.query',
              function: 'doExecute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'JpaQueryExecution.java',
              classname:
                'org.springframework.data.jpa.repository.query.JpaQueryExecution',
              line: {
                number: 91
              },
              module: 'org.springframework.data.jpa.repository.query',
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractJpaQuery.java',
              classname:
                'org.springframework.data.jpa.repository.query.AbstractJpaQuery',
              line: {
                number: 136
              },
              module: 'org.springframework.data.jpa.repository.query',
              function: 'doExecute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractJpaQuery.java',
              classname:
                'org.springframework.data.jpa.repository.query.AbstractJpaQuery',
              line: {
                number: 125
              },
              module: 'org.springframework.data.jpa.repository.query',
              function: 'execute'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RepositoryFactorySupport.java',
              classname:
                'org.springframework.data.repository.core.support.RepositoryFactorySupport$QueryExecutorMethodInterceptor',
              line: {
                number: 590
              },
              module: 'org.springframework.data.repository.core.support',
              function: 'doInvoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RepositoryFactorySupport.java',
              classname:
                'org.springframework.data.repository.core.support.RepositoryFactorySupport$QueryExecutorMethodInterceptor',
              line: {
                number: 578
              },
              module: 'org.springframework.data.repository.core.support',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ReflectiveMethodInvocation.java',
              classname:
                'org.springframework.aop.framework.ReflectiveMethodInvocation',
              line: {
                number: 185
              },
              module: 'org.springframework.aop.framework',
              function: 'proceed'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DefaultMethodInvokingMethodInterceptor.java',
              classname:
                'org.springframework.data.projection.DefaultMethodInvokingMethodInterceptor',
              line: {
                number: 59
              },
              module: 'org.springframework.data.projection',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ReflectiveMethodInvocation.java',
              classname:
                'org.springframework.aop.framework.ReflectiveMethodInvocation',
              line: {
                number: 185
              },
              module: 'org.springframework.aop.framework',
              function: 'proceed'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'TransactionAspectSupport.java',
              classname:
                'org.springframework.transaction.interceptor.TransactionAspectSupport',
              line: {
                number: 294
              },
              module: 'org.springframework.transaction.interceptor',
              function: 'invokeWithinTransaction'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'TransactionInterceptor.java',
              classname:
                'org.springframework.transaction.interceptor.TransactionInterceptor',
              line: {
                number: 98
              },
              module: 'org.springframework.transaction.interceptor',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ReflectiveMethodInvocation.java',
              classname:
                'org.springframework.aop.framework.ReflectiveMethodInvocation',
              line: {
                number: 185
              },
              module: 'org.springframework.aop.framework',
              function: 'proceed'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'PersistenceExceptionTranslationInterceptor.java',
              classname:
                'org.springframework.dao.support.PersistenceExceptionTranslationInterceptor',
              line: {
                number: 139
              },
              module: 'org.springframework.dao.support',
              function: 'invoke'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'ReflectiveMethodInvocation.java',
              classname:
                'org.springframework.aop.framework.ReflectiveMethodInvocation',
              line: {
                number: 185
              },
              module: 'org.springframework.aop.framework',
              function: 'proceed'
            },
            {
              exclude_from_grouping: false,
              library_frame: true,
              filename: 'CrudMethodMetadataPostProcessor.java',
              classname:
                'org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor',
              line: {
                number: 135
              },
              module: 'org.springframework.data.jpa.repository.support',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ReflectiveMethodInvocation.java',
              classname:
                'org.springframework.aop.framework.ReflectiveMethodInvocation',
              line: {
                number: 185
              },
              module: 'org.springframework.aop.framework',
              function: 'proceed'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ExposeInvocationInterceptor.java',
              classname:
                'org.springframework.aop.interceptor.ExposeInvocationInterceptor',
              line: {
                number: 92
              },
              module: 'org.springframework.aop.interceptor',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ReflectiveMethodInvocation.java',
              classname:
                'org.springframework.aop.framework.ReflectiveMethodInvocation',
              line: {
                number: 185
              },
              module: 'org.springframework.aop.framework',
              function: 'proceed'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'SurroundingTransactionDetectorMethodInterceptor.java',
              classname:
                'org.springframework.data.repository.core.support.SurroundingTransactionDetectorMethodInterceptor',
              line: {
                number: 61
              },
              module: 'org.springframework.data.repository.core.support',
              function: 'invoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ReflectiveMethodInvocation.java',
              classname:
                'org.springframework.aop.framework.ReflectiveMethodInvocation',
              line: {
                number: 185
              },
              module: 'org.springframework.aop.framework',
              function: 'proceed'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'JdkDynamicAopProxy.java',
              classname: 'org.springframework.aop.framework.JdkDynamicAopProxy',
              line: {
                number: 212
              },
              module: 'org.springframework.aop.framework',
              function: 'invoke'
            },
            {
              library_frame: false,
              exclude_from_grouping: false,
              filename: 'APIRestController.java',
              classname: 'co.elastic.apm.opbeans.controllers.APIRestController',
              line: {
                number: 123
              },
              module: 'co.elastic.apm.opbeans.controllers',
              function: 'stats'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'InvocableHandlerMethod.java',
              classname:
                'org.springframework.web.method.support.InvocableHandlerMethod',
              line: {
                number: 209
              },
              module: 'org.springframework.web.method.support',
              function: 'doInvoke'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'InvocableHandlerMethod.java',
              classname:
                'org.springframework.web.method.support.InvocableHandlerMethod',
              line: {
                number: 136
              },
              module: 'org.springframework.web.method.support',
              function: 'invokeForRequest'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'ServletInvocableHandlerMethod.java',
              classname:
                'org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod',
              line: {
                number: 102
              },
              module: 'org.springframework.web.servlet.mvc.method.annotation',
              function: 'invokeAndHandle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RequestMappingHandlerAdapter.java',
              classname:
                'org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter',
              line: {
                number: 877
              },
              module: 'org.springframework.web.servlet.mvc.method.annotation',
              function: 'invokeHandlerMethod'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'RequestMappingHandlerAdapter.java',
              classname:
                'org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter',
              line: {
                number: 783
              },
              module: 'org.springframework.web.servlet.mvc.method.annotation',
              function: 'handleInternal'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'AbstractHandlerMethodAdapter.java',
              classname:
                'org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter',
              line: {
                number: 87
              },
              module: 'org.springframework.web.servlet.mvc.method',
              function: 'handle'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              classname: 'org.springframework.web.servlet.DispatcherServlet',
              line: {
                number: 991
              },
              function: 'doDispatch',
              module: 'org.springframework.web.servlet'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'DispatcherServlet.java',
              classname: 'org.springframework.web.servlet.DispatcherServlet',
              line: {
                number: 925
              },
              module: 'org.springframework.web.servlet',
              function: 'doService'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 974
              },
              module: 'org.springframework.web.servlet',
              function: 'processRequest'
            },
            {
              library_frame: true,
              exclude_from_grouping: false,
              filename: 'FrameworkServlet.java',
              classname: 'org.springframework.web.servlet.FrameworkServlet',
              line: {
                number: 866
              },
              module: 'org.springframework.web.servlet',
              function: 'doGet'
            }
          ],
          subtype: 'postgresql',
          name: 'SELECT FROM order_lines',
          destination: {
            service: {
              resource: 'postgresql',
              name: 'postgresql',
              type: 'db'
            }
          },
          action: 'query',
          id: '6da142b19393515a',
          type: 'db',
          db: {
            statement:
              'select sum(orderline0_.amount*product1_.selling_price) as col_0_0_, sum(orderline0_.amount*product1_.cost) as col_1_0_, sum(orderline0_.amount*(product1_.selling_price-product1_.cost)) as col_2_0_ from order_lines orderline0_ left outer join products product1_ on orderline0_.product_id=product1_.id',
            type: 'sql',
            user: {
              name: 'postgres'
            }
          }
        },
        timestamp: {
          us: 1587478738712802
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '32c40b60360867ec'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        destination: {
          address: 'postgres',
          port: 5432
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.711Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '32c40b60360867ec'
        },
        timestamp: {
          us: 1587478738711733
        },
        span: {
          duration: {
            us: 418
          },
          subtype: 'postgresql',
          destination: {
            service: {
              resource: 'postgresql',
              name: 'postgresql',
              type: 'db'
            }
          },
          name: 'SELECT FROM orders',
          action: 'query',
          id: '358f6cd2145833b8',
          type: 'db',
          db: {
            statement: 'select count(*) as col_0_0_ from orders order0_',
            type: 'sql',
            user: {
              name: 'postgres'
            }
          }
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '32c40b60360867ec'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        destination: {
          address: 'postgres',
          port: 5432
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          type: 'apm-server',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.709Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '32c40b60360867ec'
        },
        span: {
          duration: {
            us: 247
          },
          subtype: 'postgresql',
          name: 'SELECT FROM products',
          destination: {
            service: {
              resource: 'postgresql',
              name: 'postgresql',
              type: 'db'
            }
          },
          action: 'query',
          id: 'c98edb4ac5063f65',
          type: 'db',
          db: {
            statement: 'select count(*) as col_0_0_ from products product0_',
            type: 'sql',
            user: {
              name: 'postgres'
            }
          }
        },
        timestamp: {
          us: 1587478738709689
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '32c40b60360867ec'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        destination: {
          address: 'postgres',
          port: 5432
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          type: 'apm-server',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.708Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '32c40b60360867ec'
        },
        span: {
          duration: {
            us: 244
          },
          subtype: 'postgresql',
          name: 'empty query',
          destination: {
            service: {
              resource: 'postgresql',
              name: 'postgresql',
              type: 'db'
            }
          },
          action: 'query',
          id: '27e8db001934d5a8',
          type: 'db',
          db: {
            rows_affected: 0,
            statement: '(empty query)',
            type: 'sql',
            user: {
              name: 'postgres'
            }
          }
        },
        timestamp: {
          us: 1587478738708586
        }
      },
      {
        container: {
          id: 'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
        },
        parent: {
          id: '32c40b60360867ec'
        },
        agent: {
          name: 'java',
          ephemeral_id: '201d4c40-5ad3-462b-ae84-94821c3146b2',
          version: '1.15.1-SNAPSHOT'
        },
        process: {
          pid: 6,
          title: '/opt/java/openjdk/bin/java',
          ppid: 1
        },
        destination: {
          address: 'postgres',
          port: 5432
        },
        processor: {
          name: 'transaction',
          event: 'span'
        },
        observer: {
          hostname: '8416be2599d2',
          id: '74720877-3fea-4f09-a638-fa8208dd39b1',
          type: 'apm-server',
          ephemeral_id: 'c23db157-e2d3-4b17-af80-774e4bc5fe35',
          version: '8.0.0',
          version_major: 8
        },
        trace: {
          id: 'a32064e38da9007ea21396f3c1860230'
        },
        '@timestamp': '2020-04-21T14:18:58.710Z',
        ecs: {
          version: '1.5.0'
        },
        service: {
          node: {
            name:
              'e7389f02c9aec14a5cbdaecabeccdc503f9b655652ba4caabb8fdb68b0e00541'
          },
          environment: 'production',
          name: 'opbeans-java',
          runtime: {
            name: 'Java',
            version: '11.0.6'
          },
          language: {
            name: 'Java',
            version: '11.0.6'
          },
          version: 'None'
        },
        host: {
          hostname: 'e7389f02c9ae',
          os: {
            platform: 'Linux'
          },
          ip: '172.18.0.6',
          name: 'e7389f02c9ae',
          architecture: 'amd64'
        },
        transaction: {
          id: '32c40b60360867ec'
        },
        span: {
          duration: {
            us: 230
          },
          subtype: 'postgresql',
          destination: {
            service: {
              resource: 'postgresql',
              name: 'postgresql',
              type: 'db'
            }
          },
          name: 'SELECT FROM customers',
          action: 'query',
          id: 'c663c2ba8d3cb066',
          type: 'db',
          db: {
            statement: 'select count(*) as col_0_0_ from customers customer0_',
            type: 'sql',
            user: {
              name: 'postgres'
            }
          }
        },
        timestamp: {
          us: 1587478738710775
        }
      }
    ],
    exceedsMax: false,
    errorDocs: []
  },
  errorsPerTransaction: {}
};
