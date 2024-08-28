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
    // ssr: middlewares/env.ts
    fse.copyFileSync(resolveTemplatePath('modes/ssr/middlewares/env.ts'), api.resolve.ssr('middlewares/env.ts'));
    // ssr: ssr-devserver.js
    await _handleSSRDevServer();
    // ssr: ssr-prod-webserver.mjs
    await _handleSSRProdWebserver();
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

  // ssr-devserver.js
  async function _handleSSRDevServer() {
    const fileSrc = api.resolve.cli('lib/modes/ssr/ssr-devserver.js');
    const fileSrcBak = api.resolve.cli('lib/modes/ssr/ssr-devserver-bak.js');
    copyTemplateIfNeed(fileSrc, fileSrcBak);
    const content = fse.readFileSync(fileSrcBak).toString();
    const contentNew = content
      .replace(
        "import { green } from 'kolorist'",
        `import { green } from 'kolorist'
        import { ViteNode } from 'quasar-app-extension-zova'
        import { collectCss } from 'zova-vite'
        import * as path from 'node:path'`,
      )
      .replace(
        "const autoRemove = 'document.currentScript.remove()'",
        `const autoRemove = 'document.currentScript.remove()'
        let viteNode`,
      )
      .replace(
        'const viteServer = this.#viteServer = await createServer(await quasarSsrConfig.viteServer(quasarConf))',
        `const viteServer = this.#viteServer = await createServer(await quasarSsrConfig.viteServer(quasarConf))
    if(process.env.SSR_VITE_NODE === 'true'){
      viteNode = new ViteNode(viteServer, this.#pathMap.serverEntryFile)
      await viteNode.attachServer()
      viteNode.createRunner()
    }`,
      )
      .replace(
        'const renderApp = await viteServer.ssrLoadModule(this.#pathMap.serverEntryFile)',
        `let renderApp;
        if(process.env.SSR_VITE_NODE === 'true'){
          renderApp = await viteNode.loadRender();
        }else{
          renderApp = await viteServer.ssrLoadModule(this.#pathMap.serverEntryFile)
        }`,
      )
      .replace(
        'await viteServer.ssrLoadModule(serverEntry)',
        `if (process.env.SSR_VITE_NODE === 'true') {
      await viteNode.loadRender();
    } else {
      await viteServer.ssrLoadModule(serverEntry)
    }`,
      )
      .replace(
        'let html = renderTemplate(ssrContext)',
        `ssrContext._meta.endingHeadTags += collectCss(
          [viteServer.moduleGraph.getModuleById(this.#pathMap.serverEntryFile)].concat(
          [...ssrContext.modules]
            .map((componentPath) => this.#viteServer.moduleGraph.getModuleById(
              path.resolve(componentPath),
          )))
        )

        let html = renderTemplate(ssrContext)`,
      );
    fse.writeFileSync(fileSrc, contentNew);
  }

  // ssr-prod-webserver.mjs
  async function _handleSSRProdWebserver() {
    const fileSrc = api.resolve.cli('templates/entry/ssr-prod-webserver.mjs');
    const fileSrcBak = api.resolve.cli('templates/entry/ssr-prod-webserver-bak.mjs');
    copyTemplateIfNeed(fileSrc, fileSrcBak);
    const content = fse.readFileSync(fileSrcBak).toString();
    const contentNew = content.replace(
      "import { join, basename, isAbsolute } from 'node:path'",
      "import 'zova-vite/dist/ssrEntry.js'\nimport { join, basename, isAbsolute } from 'node:path'",
    );
    fse.writeFileSync(fileSrc, contentNew);
  }
}
