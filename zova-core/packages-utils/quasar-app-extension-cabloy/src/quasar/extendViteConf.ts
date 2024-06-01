import { CabloyViteConfigResult } from '@cabloy/app-vite';
import { mergeConfig } from 'vite';
import { ConfigContext } from './types.js';

export function extendViteConf(context: ConfigContext) {
  return function extendViteConf(conf) {
    const cabloyViteMeta = context.cabloyViteMeta as CabloyViteConfigResult;
    conf.build = mergeConfig(conf.build as unknown as any, cabloyViteMeta.viteConfig.build);
  };
}
