import { generateZovaViteMeta, getFlavor } from 'zova-vite';
import { ZovaConfigMeta } from 'zova-core';
import { mergeConfig } from 'vite';
import { ConfigContext } from './types.js';

export function extendQuasarConf(context: ConfigContext) {
  return async function extendQuasarConf(conf, api) {
    const appPaths = api.ctx.appPaths;
    const flavor = getFlavor();
    const mode = api.ctx.prod ? 'production' : 'development';
    const appMode = api.ctx.modeName;
    const configMeta: ZovaConfigMeta = {
      flavor,
      mode,
      appMode,
    };
    const configOptions = {
      appDir: appPaths.appDir,
      runtimeDir: '.quasar/zova',
      zovaManualChunk: conf.zovaManualChunk,
    };
    // zovaViteMeta
    const zovaViteMeta = (context.zovaViteMeta = await generateZovaViteMeta(configMeta, configOptions));

    // boot
    conf.boot.unshift('zova');
    // build: alias
    conf.build = mergeConfig(conf.build as unknown as any, {
      alias: zovaViteMeta.viteConfig.resolve.alias,
      env: zovaViteMeta.env,
    });
    // build: publicPath
    conf.build.publicPath = zovaViteMeta.env.APP_PUBLIC_PATH;
    // build: vueRouterMode/vueRouterBase
    conf.build.vueRouterMode = zovaViteMeta.env.APP_ROUTER_MODE;
    conf.build.vueRouterBase = zovaViteMeta.env.APP_ROUTER_BASE;
    // build: vitePlugins
    const vitePlugins = zovaViteMeta.vitePlugins.map(item => {
      return [item[1], item[2], item[3]];
    });
    conf.build.vitePlugins = (conf.build.vitePlugins || []).concat(vitePlugins);
    // devServer
    conf.devServer = mergeConfig(conf.devServer, zovaViteMeta.viteConfig.server);
  };
}
