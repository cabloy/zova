import fse from 'fs-extra';
import { IndexAPI } from '@quasar/app-vite';
import { getAbsolutePathOfModule } from 'zova-vite';
import { resolveTemplatePath } from '../utils.js';
import path from 'node:path';

export function extendFiles(api: IndexAPI, flavor: string) {
  return async function extendFiles() {
    // patch templates
    await patchTemplates();
    // prepare templates
    await prepareTemplates();
    // prepare vuetify
    await prepareVuetify();
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
    // ssr: html-template.js
    await _handleSSRHtmlTemplate();
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

  // html-template
  async function _handleSSRHtmlTemplate() {
    const fileSrc = api.resolve.cli('lib/utils/html-template.js');
    const fileSrcBak = api.resolve.cli('lib/utils/html-template-bak.js');
    copyTemplateIfNeed(fileSrc, fileSrcBak);
    const content = fse.readFileSync(fileSrcBak).toString();
    const contentNew = content
      .replace(
        'const bodyStartTagRE = /(<body[^>]*)(>)/i',
        'const bodyStartTagRE = /(<body[^>]*)(>)/i\nconst bodyEndRE = /(<\\/body>)/i',
      )
      .replace(
        /\.replace\(\s+bodyStartTagRE,/,
        `.replace(
      bodyEndRE,
      (_, tag) => \`{{ ssrContext._meta.endingBodyTags || '' }}\${ tag }\`
    )
    .replace(
      bodyStartTagRE,`,
      );
    fse.writeFileSync(fileSrc, contentNew);
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
        import { collectCss, renderTeleports } from 'zova-vite'
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
          [viteServer.moduleGraph.getModuleById(this.#pathMap.serverEntryFile.replaceAll('\\\\','/'))].concat(
          [...(ssrContext.modules||[])]
            .map((componentPath) => this.#viteServer.moduleGraph.getModuleById(
              path.resolve(componentPath).replaceAll('\\\\','/'),
          )))
        )

        let html = renderTemplate(ssrContext)`,
      )
      .replace(
        '<div id="q-app">${ runtimePageContent }</div>',
        '<div id="q-app">${ runtimePageContent }</div>${ renderTeleports(ssrContext.teleports) }',
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

  async function prepareVuetify() {
    let modulePath;
    try {
      modulePath = getAbsolutePathOfModule('vuetify', 'lib/framework.mjs');
    } catch (_) {}
    if (!modulePath) return;
    // copy
    fse.copyFileSync(
      resolveTemplatePath('vuetify/composables/hydration.mjs'),
      path.join(modulePath, 'lib/composables/hydration.mjs'),
    );
    fse.copyFileSync(
      resolveTemplatePath('vuetify/composables/ssrBoot.mjs'),
      path.join(modulePath, 'lib/composables/ssrBoot.mjs'),
    );
  }
}
