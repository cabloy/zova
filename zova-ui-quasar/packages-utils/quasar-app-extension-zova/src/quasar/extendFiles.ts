import fse from 'fs-extra';
import { IndexAPI } from '@quasar/app-vite';
import { resolveTemplatePath } from '../utils.js';
import { getFlavor } from 'zova-vite';

export function extendFiles(api: IndexAPI) {
  const flavor = getFlavor();

  return async function extendFiles() {
    // patch templates
    await patchTemplates();
    // prepare templates
    await prepareTemplates();
  };

  async function patchTemplates() {
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

  async function prepareTemplates() {
    // ssr
    if ((<any>api.ctx.mode).ssr) {
      // prod
      if (api.ctx.prod) {
        copyTemplateIfNeed(resolveTemplatePath('env/.env.ssr.production'), api.resolve.app('env/.env.ssr.production'));
      }
      // admin/front
      if (flavor === 'admin') {
        copyTemplateIfNeed(resolveTemplatePath('env/.env.ssr.admin'), api.resolve.app('env/.env.ssr.admin'));
      } else if (flavor === 'front') {
        copyTemplateIfNeed(resolveTemplatePath('env/.env.ssr.front'), api.resolve.app('env/.env.ssr.front'));
      }
    }
  }

  function copyTemplateIfNeed(fileSrc, fileDest) {
    if (!fse.existsSync(fileDest)) {
      fse.copyFileSync(fileSrc, fileDest);
    }
  }
}
