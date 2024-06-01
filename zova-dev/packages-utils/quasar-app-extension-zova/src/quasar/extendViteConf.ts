import { ZovaViteConfigResult } from 'zova-vite';
import { mergeConfig } from 'vite';
import { ConfigContext } from './types.js';

export function extendViteConf(context: ConfigContext) {
  return function extendViteConf(conf) {
    const zovaViteMeta = context.zovaViteMeta as ZovaViteConfigResult;
    conf.build = mergeConfig(conf.build as unknown as any, zovaViteMeta.viteConfig.build);
  };
}
