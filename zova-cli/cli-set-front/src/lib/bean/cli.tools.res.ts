import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import path from 'path';
import { generateBeans } from './toolsRes/generateBeans.js';
import { generateComponents } from './toolsRes/generateComponents.js';
import { generatePages } from './toolsRes/generatePages.js';
import { generateIcons } from './toolsRes/generateIcons.js';
import { generateConfig, generateConstant, generateError, generateLocale } from './toolsRes/generateConfig.js';
import { generateServices } from './toolsRes/generateServices.js';
import { generateScope } from './toolsRes/generateScope.js';

declare module 'zova-cli' {
  interface ICommandArgv {}
}

export class CliToolsRes extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const moduleNames = argv._;
    const total = moduleNames.length;
    for (let index = 0; index < total; index++) {
      const moduleName = moduleNames[index];
      // log
      await this.console.log({
        total,
        progress: index,
        text: moduleName,
      });
      // generate res
      await this._generateRes(moduleName);
    }
  }

  async _generateRes(moduleName: string) {
    const module = this.helper.findModule(moduleName);
    if (!module) throw new Error(`module not found: ${moduleName}`);
    const modulePath = module.root;
    await this.helper.ensureDir(path.join(modulePath, 'src/.metadata'));
    const resDest = path.join(modulePath, 'src/.metadata/index.ts');
    // relativeNameCapitalize
    const relativeNameCapitalize = this.helper.stringToCapitalize(moduleName, '-');
    // content
    let content = '';
    // beans
    content += await generateBeans(moduleName, modulePath);
    // components
    const contentComponents = await generateComponents(moduleName, modulePath);
    content += contentComponents;
    // pages
    content += await generatePages(module.info, moduleName, modulePath);
    // icons
    content += await generateIcons(moduleName, modulePath);
    // config
    const contentConfig = await generateConfig(modulePath);
    content += contentConfig;
    // constant
    const contentConstants = await generateConstant(modulePath);
    content += contentConstants;
    // locale
    const contentLocales = await generateLocale(modulePath);
    content += contentLocales;
    // error
    const contentErrors = await generateError(modulePath);
    content += contentErrors;
    // services
    const contentServices = await generateServices(modulePath);
    content += contentServices;
    // scope
    content += await generateScope(moduleName, relativeNameCapitalize, {
      components: contentComponents,
      config: contentConfig,
      errors: contentErrors,
      locales: contentLocales,
      constants: contentConstants,
      services: contentServices,
    });
    // empty
    if (!content.trim()) {
      content = 'export {};';
    }
    // save
    await fse.writeFile(resDest, content);
    await this.helper.formatFile({ fileName: resDest, logPrefix: 'format: ' });
    // generate this
    await this._generateThis(moduleName, relativeNameCapitalize, modulePath);
    // index
    await this._generateIndex(modulePath);
  }

  async _generateThis(moduleName: string, relativeNameCapitalize: string, modulePath: string) {
    const thisDest = path.join(modulePath, 'src/.metadata/this.ts');
    if (fse.existsSync(thisDest)) return;
    const content = `export const __ThisModule__ = '${moduleName}';
export { ScopeModule${relativeNameCapitalize} as ScopeModule } from './index.js';
`;
    // save
    await fse.writeFile(thisDest, content);
  }

  async _generateIndex(modulePath: string) {
    const jsExport = "export * from './.metadata/index.js';";
    const jsFile = path.join(modulePath, 'src/index.ts');
    let jsContent;
    if (fse.existsSync(jsFile)) {
      jsContent = (await fse.readFile(jsFile)).toString();
      if (jsContent.indexOf(jsExport) > -1) return;
      jsContent = jsExport + '\n' + jsContent;
    } else {
      jsContent = jsExport + '\n';
    }
    await fse.writeFile(jsFile, jsContent);
  }
}
