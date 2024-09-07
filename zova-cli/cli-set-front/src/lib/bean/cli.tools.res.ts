import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { IModuleInfo } from '@cabloy/module-info';
import gogocode from 'gogocode';

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
    content += await this._generateBeans(moduleName, modulePath);
    // components
    content += await this._generateComponents(moduleName, modulePath);
    // pages
    content += await this._generatePages(module.info, moduleName, modulePath);
    // save
    await fse.writeFile(resDest, content);
    await this.helper.formatFile({ fileName: resDest, logPrefix: 'format: ' });
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
    const content = `/** beans: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    ${contentRecords.join('\n')}
  }
}
/** beans: end */
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
      const className = componentName.charAt(0).toUpperCase() + componentName.substring(1);
      const componentFullName = `${moduleName}:${componentName}`;
      contentExports.push(`export * as NSController${className} from '../component/${componentName}/controller.js';`);
      contentImports.push(`import * as NSController${className} from '../component/${componentName}/controller.js';`);
      contentImports2.push(`import ${componentName} from '../component/${componentName}/index.vue';`);
      contentComponents.push(componentName);
      contentRecords.push(`'${componentFullName}': NSController${className}.Controller${className};`);
    }
    // combine
    const content = `/** components: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
${contentImports2.join('\n')}
export const components = { ${contentComponents.join(', ')} };
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    ${contentRecords.join('\n')}
  }
}
/** components: end */
`;
    return content;
  }

  async _generatePages(moduleInfo: IModuleInfo, moduleName: string, modulePath: string) {
    const pattern = `${modulePath}/src/page/*/index.vue`;
    const files = await eggBornUtils.tools.globbyAsync(pattern);
    const contentExports: string[] = [];
    const contentImports: string[] = [];
    const contentPathRecords: string[] = [];
    const contentNameRecords: string[] = [];
    const contentPathSchemas: string[] = [];
    const contentNameSchemas: string[] = [];
    for (const file of files) {
      const pageName = path.basename(file.substring(0, file.length - '/index.vue'.length));
      const className = pageName.charAt(0).toUpperCase() + pageName.substring(1);
      //
      const { routePath, routeName } = await this._extractRoutePathOrName(modulePath, className);
      // no matter that: route.meta?.absolute
      const routePathFull = routePath
        ? `/${moduleInfo.pid}/${moduleInfo.name}/${routePath}`
        : `/${moduleInfo.pid}/${moduleInfo.name}`;
      const routeNameFull = `${moduleName}:${routeName}`;
      //
      contentExports.push(`export * as NSControllerPage${className} from '../page/${pageName}/controller.js';`);
      contentImports.push(`import * as NSControllerPage${className} from '../page/${pageName}/controller.js';`);
      if (!routeName) {
        contentPathRecords.push(`'${routePathFull}': NSControllerPage${className}.QueryInput;`);
      } else {
        contentNameRecords.push(
          `'${routeNameFull}': TypePageParamsQuery<NSControllerPage${className}.QueryInput, NSControllerPage${className}.ParamsInput>;`,
        );
      }
      if (!routeName) {
        contentPathSchemas.push(`'${routePathFull}': {
    query: NSControllerPage${className}.QuerySchema,
  },`);
      } else {
        contentNameSchemas.push(`'${routeNameFull}': {
    params: NSControllerPage${className}.ParamsSchema,
    query: NSControllerPage${className}.QuerySchema,
  },`);
      }
    }
    // combine
    const content = `/** pages: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
export * from '../routes.js';
${contentNameRecords.length > 0 ? "import { TypePageParamsQuery } from 'zova';" : ''}
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    ${contentPathRecords.join('\n')}
  }
  export interface IPageNameRecord {
    ${contentNameRecords.join('\n')}
  }
}
export const pagePathSchemas = {
  ${contentPathSchemas.join('\n')}
};
export const pageNameSchemas = {
  ${contentNameSchemas.join('\n')}
};
/** pages: end */
`;
    return content;
  }

  async _extractRoutePathOrName(modulePath: string, className: string) {
    const targetFile = path.join(modulePath, 'src/routes.ts');
    const content = (await fse.readFile(targetFile)).toString('utf8');
    const ast = gogocode(content);
    const astNode = ast.find('export const routes: IModuleRoute[] = [$_$]');
    const astMatches = astNode.match[0];
    const astMatch = astMatches.find(item => {
      return (<any>item.node).properties.some(prop => {
        return prop.key.name === 'component' && prop.value.name === className;
      });
    });
    if (!astMatch) {
      throw new Error(`page route not found: ${className}`);
    }
    const astPropPath = (<any>astMatch?.node).properties.find(prop => {
      return prop.key.name === 'path';
    });
    const routePath = astPropPath?.value.value || '';
    const astPropName = (<any>astMatch?.node).properties.find(prop => {
      return prop.key.name === 'name';
    });
    const routeName = astPropName?.value.value;
    return { routePath, routeName };
  }
}
