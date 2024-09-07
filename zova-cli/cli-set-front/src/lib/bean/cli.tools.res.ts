import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import path from 'path';
import eggBornUtils from 'egg-born-utils';

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
    // bean
    content += await this._generateBeans(moduleName, modulePath);
    content += await this._generateComponents(moduleName, modulePath);
    // save
    await fse.writeFile(resDest, content);
  }

  async _generateBeans(moduleName: string, modulePath: string) {
    const pattern = `${modulePath}/src/bean/*.ts`;
    const files = await eggBornUtils.tools.globbyAsync(pattern);
    const contentExports: string[] = [];
    const contentImports: string[] = [];
    const contentRecords: string[] = [];
    for (const file of files) {
      const fileName = path.basename(file);
      const parts = fileName.split('.').slice(0, -1);
      if (parts[0] === 'local') continue;
      const fileNameJS = fileName.replace('.ts', '.js');
      const className = parts.map(item => item.charAt(0).toUpperCase() + item.substring(1)).join('');
      const beanFullName = `${moduleName}.${parts.join('.')}`;
      contentExports.push(`export * from '../bean/${fileNameJS}';`);
      contentImports.push(`import { ${className} } from '../bean/${fileNameJS}';`);
      contentRecords.push(`'${beanFullName}': ${className};`);
    }
    // combine
    const content = `${contentExports.join('\n')}
${contentImports.join('\n')}
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    ${contentRecords.join('\n')}
  }
}
`;
    return content;
  }

  async _generateComponents(moduleName: string, modulePath: string) {
    const pattern = `${modulePath}/src/component/*/index.vue`;
    const files = await eggBornUtils.tools.globbyAsync(pattern);
    const contentExports: string[] = [];
    const contentImports: string[] = [];
    const contentImports2: string[] = [];
    const contentComponents: string[] = [];
    const contentRecords: string[] = [];
    for (const file of files) {
      const componentName = path.basename(file.substring(0, file.length - '/index.vue'.length));
      await this.console.log(componentName);
      const className = componentName.charAt(0).toUpperCase() + componentName.substring(1);
      const componentFullName = `${moduleName}:${componentName}`;
      contentExports.push(`export * as NSController${className} from '../component/${componentName}/controller.js';`);
      contentImports.push(`import * as NSController${className} from '../component/${componentName}/controller.js';`);
      contentImports2.push(`import ${componentName} from '../component/${componentName}/index.vue';`);
      contentComponents.push(componentName);
      contentRecords.push(`'${componentFullName}': NSController${className}.Controller${className};`);
    }
    // combine
    const content = `${contentExports.join('\n')}
${contentImports.join('\n')}
${contentImports2.join('\n')}
export const components = { ${contentComponents.join(', ')} };
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    ${contentRecords.join('\n')}
  }
}
`;
    return content;
  }
}
