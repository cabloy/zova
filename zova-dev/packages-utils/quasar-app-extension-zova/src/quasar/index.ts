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
import { getFlavor } from 'zova-vite';
import { printBanner } from './printBanner.js';

export async function quasar(api: IndexAPI) {
  // flavor
  const flavor = getFlavor();
  // files
  await extendFiles(api, flavor)();
  // context
  const context: ConfigContext = { zovaViteMeta: undefined };
  // config
  api.extendQuasarConf(extendQuasarConf(context, flavor));
  api.extendViteConf(extendViteConf(context));
  // before dev
  api.beforeDev(async (api, { quasarConf }) => {
    printBanner(context, flavor)(quasarConf, api);
  });
  // before build
  api.beforeBuild(async (api, { quasarConf }) => {
    printBanner(context, flavor)(quasarConf, api);
  });
}
