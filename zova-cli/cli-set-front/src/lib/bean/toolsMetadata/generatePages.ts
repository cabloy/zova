import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { IModuleInfo } from '@cabloy/module-info';
import fse from 'fs-extra';
import gogocode from 'gogocode';

export async function generatePages(moduleInfo: IModuleInfo, moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/page/*/index.vue`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
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
    const { routePath, routeName } = await _extractRoutePathOrName(modulePath, className);
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

async function _extractRoutePathOrName(modulePath: string, className: string) {
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