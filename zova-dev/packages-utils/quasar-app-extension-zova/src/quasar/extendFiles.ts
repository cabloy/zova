import fse from 'fs-extra';
import { IndexAPI } from '@quasar/app-vite';
import { resolveTemplatePath } from '../utils.js';

export function extendFiles(api: IndexAPI, flavor: string) {
  return async function extendFiles() {
    // patch templates
    await patchTemplates();
    // prepare templates
    await prepareTemplates();
  };

  async function patchTemplates() {
    // app.js
    fse.copyFileSync(resolveTemplatePath('entry/app.js'), api.resolve.cli('templates/entry/app.js'));
    // client-entry.js
    fse.copyFileSync(resolveTemplatePath('entry/client-entry.js'), api.resolve.cli('templates/entry/client-entry.js'));
    // server-entry.mjs
    fse.copyFileSync(
      resolveTemplatePath('entry/server-entry.mjs'),
      api.resolve.cli('templates/entry/server-entry.mjs'),
    );
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
