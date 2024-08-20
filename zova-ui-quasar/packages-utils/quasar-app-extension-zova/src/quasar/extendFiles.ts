import fse from 'fs-extra';
import { ConfigContext } from './types.js';
import { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import { IndexAPI } from '@quasar/app-vite';

export function extendFiles(_context: ConfigContext) {
  return async function extendFiles(conf: QuasarConf, api: IndexAPI) {
    // patch templates
    await patchTemplates(conf, api);
    // prepare templates
    await prepareTemplates(conf, api);
  };

  async function patchTemplates(_conf: QuasarConf, api: IndexAPI) {
    // client-entry.js
    const clientEntryFile = api.resolve.cli('templates/entry/client-entry.js');
    const clientEntryContent = (await fse.readFile(clientEntryFile)).toString();
    if (clientEntryContent.indexOf('quasarUserOptions.config.dark') === -1) {
      const clientEntryContentNew = clientEntryContent.replace(
        'async function start',
        `quasarUserOptions.config.dark = window.__prefersColorSchemeDark
    async function start`,
      );
      await fse.outputFile(clientEntryFile, clientEntryContentNew);
    }
  }

  async function prepareTemplates(_conf: QuasarConf, api: IndexAPI) {
    if (process.env.META_APP_MODE === 'ssr') {
      if (!fse.existsSync(api.resolve.ssr(''))) {
        fse.copySync(api.resolve.cli('templates/ssr/ts'), api.resolve.ssr(''));
        fse.copySync(api.resolve.cli('templates/ssr/ssr-flag.d.ts'), api.resolve.ssr('ssr-flag.d.ts'));
      }
    }
  }
}
