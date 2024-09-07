import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import path from 'path';
import { generateBeans } from './toolsRes/generateBeans.js';
import { generateComponents } from './toolsRes/generateComponents.js';
import { generatePages } from './toolsRes/generatePages.js';
import { generateIcons } from './toolsRes/generateIcons.js';
import { generateConfig, generateConstant } from './toolsRes/generateConfig.js';

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
      // generate
      await this._generateRes(moduleName);
    }
  }

  async _generateRes(moduleName: string) {
    const module = this.helper.findModule(moduleName);
    if (!module) throw new Error(`module not found: ${moduleName}`);
    const modulePath = module.root;
    await this.helper.ensureDir(path.join(modulePath, 'src/.res'));
    const resDest = path.join(modulePath, 'src/.res/index.ts');
    // content
    let content = '';
    // beans
    content += await generateBeans(moduleName, modulePath);
    // components
    content += await generateComponents(moduleName, modulePath);
    // pages
    content += await generatePages(module.info, moduleName, modulePath);
    // icons
    content += await generateIcons(moduleName, modulePath);
    // config
    content += await generateConfig(modulePath);
    // constant
    content += await generateConstant(modulePath);
    // empty
    if (!content.trim()) {
      content = 'export {};';
    }
    // save
    await fse.writeFile(resDest, content);
    await this.helper.formatFile({ fileName: resDest, logPrefix: 'format: ' });
  }
}
