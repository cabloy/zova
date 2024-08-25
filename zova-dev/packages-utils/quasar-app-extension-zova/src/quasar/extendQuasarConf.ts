import { generateZovaViteMeta } from 'zova-vite';
import { ZovaConfigMeta } from 'zova-shared';
import { mergeConfig } from 'vite';
import { ConfigContext } from './types.js';
import { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import { IndexAPI } from '@quasar/app-vite';

export function extendQuasarConf(context: ConfigContext, flavor: string) {
  return async function extendQuasarConf(conf: QuasarConf, api: IndexAPI) {
    const appPaths = api.ctx.appPaths;
    const mode = api.ctx.prod ? 'production' : 'development';
    const appMode = api.ctx.modeName;
    const configMeta: ZovaConfigMeta = {
      flavor,
      mode,
      appMode,
    };
    const configOptions = {
      appDir: appPaths.appDir,
      runtimeDir: '.zova',
      zovaManualChunk: (<any>conf).zovaManualChunk,
    };
    // zovaViteMeta
    context.configMeta = configMeta;
    context.configOptions = configOptions;
    const zovaViteMeta = (context.zovaViteMeta = await generateZovaViteMeta(configMeta, configOptions));

    // boot
    if (!conf.boot) conf.boot = [];
    conf.boot.unshift('zova');
    // build: alias
    conf.build = mergeConfig(conf.build as unknown as any, {
      alias: zovaViteMeta.viteConfig.resolve.alias,
      // not set env here
      //env: zovaViteMeta.env,
    });
    // build: publicPath
    conf.build.publicPath = process.env.APP_PUBLIC_PATH;
    // build: vueRouterMode/vueRouterBase
    conf.build.vueRouterMode = process.env.APP_ROUTER_MODE as any;
    conf.build.vueRouterBase = process.env.APP_ROUTER_BASE;
    // build: vitePlugins
    const vitePlugins = zovaViteMeta.vitePlugins.map(item => {
      return [item[1], item[2], item[3]];
    });
    conf.build.vitePlugins = (conf.build.vitePlugins || []).concat(vitePlugins as any);
    // build: distDir
    conf.build.distDir = zovaViteMeta.viteConfig.build.outDir;
    // build: analyze
    conf.build.analyze = conf.build.analyze ?? process.env.BUILD_ANALYZE === 'true';
    // devServer
    conf.devServer = mergeConfig(conf.devServer || {}, zovaViteMeta.viteConfig.server);
    // ssr: middlewares
    const ssrMiddlewares = ['env'].concat(conf.ssr?.middlewares || []).concat('render');
    // ssr
    conf.ssr = mergeConfig(conf.ssr || {}, {
      middlewares: ssrMiddlewares,
      prodPort: Number(process.env.SSR_PROD_PORT),
      manualStoreSerialization: true,
      manualStoreSsrContextInjection: true,
      manualStoreHydration: true,
      manualPostHydrationTrigger: true,
    });
    // sourceFiles
    conf.sourceFiles = mergeConfig(conf.sourceFiles || {}, {
      rootComponent: 'src/boot/app/index.vue',
      router: 'src/boot/router',
    });
  };
}
