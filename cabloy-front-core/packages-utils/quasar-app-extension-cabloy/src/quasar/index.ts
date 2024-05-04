/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

import { extendQuasarConf } from './extendQuasarConf.js';
import { extendViteConf } from './extendViteConf.js';
import { ConfigContext } from './types.js';

export async function quasar(api) {
  // context
  const context: ConfigContext = { cabloyViteMeta: undefined };
  // config
  api.extendQuasarConf(extendQuasarConf(context));
  api.extendViteConf(extendViteConf(context));
  // before dev
  api.beforeDev(async (_api, { quasarConf: _quasarConf }) => {});
  // before build
  api.beforeBuild(async (_api, { quasarConf: _quasarConf }) => {});
}
