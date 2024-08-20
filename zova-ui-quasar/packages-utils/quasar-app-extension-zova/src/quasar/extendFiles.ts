import fse from 'fs-extra';
import { ConfigContext } from './types.js';
import { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import { IndexAPI } from '@quasar/app-vite';

export function extendFiles(_context: ConfigContext) {
  return async function extendFiles(conf: QuasarConf, api: IndexAPI) {
    // patch templates
    await patchTemplates(conf, api);
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
}
