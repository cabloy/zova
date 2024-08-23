import fse from 'fs-extra';
import { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import { IndexAPI } from '@quasar/app-vite';
import path from 'node:path';
import { ConfigContext } from './types.js';

export function extendAfterBuild(context: ConfigContext, _flavor: string) {
  return async function extendAfterBuild(conf: QuasarConf, api: IndexAPI) {
    const appMode = api.ctx.modeName;
    if (appMode === 'ssr') {
      // env
      const env = Object.assign({}, context.zovaViteMeta?.env, {
        SERVER: true,
        CLIENT: false,
      });
      const envFile = path.join(conf.build!.distDir!, '.env.json');
      fse.outputFileSync(envFile, JSON.stringify(env, null, 2));
    }
  };
}
