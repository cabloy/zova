import { BuildOptions } from 'esbuild';
import { ConfigContext } from './types.js';
import { IndexAPI } from '@quasar/app-vite';

export function extendSSRWebserverConf(_context: ConfigContext) {
  return function extendSSRWebserverConf(conf: BuildOptions, _api: IndexAPI) {
    conf.minify = process.env.BUILD_MINIFY === 'true';
  };
}
