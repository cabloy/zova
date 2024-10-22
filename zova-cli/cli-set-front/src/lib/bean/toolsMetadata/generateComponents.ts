import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateComponents(moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/component/*/index.vue`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentImports2: string[] = [];
  const contentComponents: string[] = [];
  const contentRecords: string[] = [];
  for (const file of files) {
    const componentName = path.basename(file.substring(0, file.length - '/index.vue'.length));
    const className = componentName.charAt(0).toUpperCase() + componentName.substring(1);
    const componentFullName = `${moduleName}:${componentName}`;
    const componentName2 = 'Z' + firstCharToUpperCase(componentName);
    contentExports.push(`export { Controller${className} } from '../component/${componentName}/controller.js';`);
    contentExports.push(`export * as NSController${className} from '../component/${componentName}/controller.js';`);
    contentImports.push(`import * as NSController${className} from '../component/${componentName}/controller.js';`);
    contentImports2.push(`export { default as ${componentName2} } from '../component/${componentName}/index.vue';`);
    contentImports2.push(`import ${componentName2} from '../component/${componentName}/index.vue';`);
    contentComponents.push(`'${componentName}': ${componentName2},`);
    contentRecords.push(`'${componentFullName}': NSController${className}.Controller${className};`);
  }
  // combine
  const content = `/** components: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
${contentImports2.join('\n')}
export const components = {
  ${contentComponents.join('\n')}
};
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

function firstCharToUpperCase(name: string) {
  return name.charAt(0).toUpperCase() + name.substring(1);
}
