import { generateCabloyViteMeta, getFlavor } from '@cabloy/app-vite';
import { CabloyConfigMeta } from '@cabloy/front-core';
import { mergeConfig } from 'vite';
import { ConfigContext } from './types.js';

export function extendQuasarConf(context: ConfigContext) {
  return async function extendQuasarConf(conf, api) {
    const appPaths = api.ctx.appPaths;
    const flavor = getFlavor();
    const mode = api.ctx.prod ? 'production' : 'development';
    const appMode = api.ctx.modeName;
    const configMeta: CabloyConfigMeta = {
      flavor,
      mode,
      appMode,
    };
    const configOptions = {
      appDir: appPaths.appDir,
      runtimeDir: '.quasar/cabloy',
      cabloyManualChunk: conf.cabloyManualChunk,
    };
    // cabloyViteMeta
    const cabloyViteMeta = (context.cabloyViteMeta = await generateCabloyViteMeta(configMeta, configOptions));

    // boot
    conf.boot.unshift('cabloy');
    // build: alias
    conf.build = mergeConfig(conf.build as unknown as any, {
      alias: cabloyViteMeta.alias,
      env: cabloyViteMeta.env,
    });
    // build: publicPath
    conf.build.publicPath = cabloyViteMeta.env.APP_PUBLIC_PATH;
    // build: vueRouterMode/vueRouterBase
    conf.build.vueRouterMode = cabloyViteMeta.env.APP_ROUTER_MODE;
    conf.build.vueRouterBase = cabloyViteMeta.env.APP_ROUTER_BASE;
    // build: vitePlugins
    const vitePlugins = cabloyViteMeta.vitePlugins.map(item => {
      return [item[1], item[2], item[3]];
    });
    conf.build.vitePlugins = (conf.build.vitePlugins || []).concat(vitePlugins);
    // devServer
    conf.devServer = mergeConfig(conf.devServer, { proxy: cabloyViteMeta.proxy });
  };
}
