import fse from 'fs-extra';
import { ConfigContext } from './types.js';
import { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import { IndexAPI } from '@quasar/app-vite';
import { resolveTemplatePath } from '../utils.js';

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
    if ((<any>api.ctx.mode).ssr) {
      if (api.ctx.prod) {
        const envSSRDest = api.resolve.app('env/.env.ssr.production');
        if (!fse.existsSync(envSSRDest)) {
          fse.copyFileSync(resolveTemplatePath('env/.env.ssr.production'), envSSRDest);
        }
      }
    }
  }
}
