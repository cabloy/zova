import { ZovaViteConfigResult } from 'zova-vite';
import { mergeConfig } from 'vite';
import { ConfigContext } from './types.js';

export function extendViteConf(context: ConfigContext) {
  return function extendViteConf(conf, opts) {
    const zovaViteMeta = context.zovaViteMeta as ZovaViteConfigResult;
    // conf.build override zovaViteMeta.viteConfig.build
    const minify = conf.build.minify;
    // have two outDir for ssr
    const outDir = conf.build.outDir;
    conf.build = mergeConfig(conf.build as unknown as any, zovaViteMeta.viteConfig.build);
    if (minify === false) {
      conf.build.minify = minify;
    }
    if (outDir) {
      conf.build.outDir = outDir;
    }
    // hmr
    if (opts.isClient) {
      conf.server = mergeConfig(conf.server, {
        hmr: {
          port: 24679,
        },
      });
    }
  };
}
