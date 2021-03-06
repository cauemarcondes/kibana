<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-server](./kibana-plugin-server.md) &gt; [CoreSetup](./kibana-plugin-server.coresetup.md)

## CoreSetup interface

Context passed to the plugins `setup` method.

<b>Signature:</b>

```typescript
export interface CoreSetup 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [context](./kibana-plugin-server.coresetup.context.md) | <code>{</code><br/><code>        createContextContainer: ContextSetup['createContextContainer'];</code><br/><code>    }</code> |  |
|  [elasticsearch](./kibana-plugin-server.coresetup.elasticsearch.md) | <code>{</code><br/><code>        adminClient$: Observable&lt;ClusterClient&gt;;</code><br/><code>        dataClient$: Observable&lt;ClusterClient&gt;;</code><br/><code>        createClient: (type: string, clientConfig?: Partial&lt;ElasticsearchClientConfig&gt;) =&gt; ClusterClient;</code><br/><code>    }</code> |  |
|  [http](./kibana-plugin-server.coresetup.http.md) | <code>{</code><br/><code>        createCookieSessionStorageFactory: HttpServiceSetup['createCookieSessionStorageFactory'];</code><br/><code>        registerOnPreAuth: HttpServiceSetup['registerOnPreAuth'];</code><br/><code>        registerAuth: HttpServiceSetup['registerAuth'];</code><br/><code>        registerOnPostAuth: HttpServiceSetup['registerOnPostAuth'];</code><br/><code>        basePath: HttpServiceSetup['basePath'];</code><br/><code>        isTlsEnabled: HttpServiceSetup['isTlsEnabled'];</code><br/><code>        registerRouteHandlerContext: &lt;T extends keyof RequestHandlerContext&gt;(name: T, provider: RequestHandlerContextProvider&lt;T&gt;) =&gt; RequestHandlerContextContainer;</code><br/><code>        createRouter: () =&gt; IRouter;</code><br/><code>    }</code> |  |

