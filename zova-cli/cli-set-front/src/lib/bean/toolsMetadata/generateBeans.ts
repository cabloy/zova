import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateBeans(moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/bean/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentRecords: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const parts = fileName.split('.').slice(0, -1);
    if (parts.length < 2 || parts[0] === 'local') continue;
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
