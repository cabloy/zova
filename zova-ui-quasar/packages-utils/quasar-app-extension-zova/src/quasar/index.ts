/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

import { IndexAPI } from '@quasar/app-vite';
import { extendFiles } from './extendFiles.js';
import { extendQuasarConf } from './extendQuasarConf.js';
import { extendViteConf } from './extendViteConf.js';
import { ConfigContext } from './types.js';

export async function quasar(api: IndexAPI) {
  // context
  const context: ConfigContext = { zovaViteMeta: undefined };
  // config
  api.extendQuasarConf(extendFiles(context));
  api.extendQuasarConf(extendQuasarConf(context));
  api.extendViteConf(extendViteConf(context));
  // before dev
  api.beforeDev(async (_api, { quasarConf: _quasarConf }) => {});
  // before build
  api.beforeBuild(async (_api, { quasarConf: _quasarConf }) => {});
}
