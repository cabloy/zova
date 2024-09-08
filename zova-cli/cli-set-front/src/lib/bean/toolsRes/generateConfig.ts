import path from 'path';
import fse from 'fs-extra';
import eggBornUtils from 'egg-born-utils';

export async function generateConfig(modulePath: string) {
  const configFile = path.join(modulePath, 'src/config/config.ts');
  if (!fse.existsSync(configFile)) return '';
  // combine
  const content = `/** config: begin */
export * from '../config/config.js';
/** config: end */
`;
  return content;
}

export async function generateConstant(modulePath: string) {
  const constantFile = path.join(modulePath, 'src/config/constants.ts');
  if (!fse.existsSync(constantFile)) return '';
  // combine
  const content = `/** constant: begin */
export * from '../config/constants.js';
/** constant: end */
`;
  return content;
}

export async function generateLocale(modulePath: string) {
  const pattern = `${modulePath}/src/config/locale/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  const contentImports: string[] = [];
  const contentLocales: string[] = [];
  for (const file of files) {
    const localeName = path.basename(file.substring(0, file.length - '.ts'.length));
    const className = 'locale_' + localeName.replace('-', '_');
    contentImports.push(`import ${className} from '../config/locale/${localeName}.js';`);
    contentLocales.push(`'${localeName}': ${className},`);
  }
  // combine
  const content = `/** locale: begin */
${contentImports.join('\n')}
export const locales = {
  ${contentLocales.join('\n')}
};
/** locale: end */
`;
  return content;
}

export async function generateError(modulePath: string) {
  const errorFile = path.join(modulePath, 'src/config/errors.ts');
  if (!fse.existsSync(errorFile)) return '';
  // combine
  const content = `/** error: begin */
export * from '../config/errors.js';
/** error: end */
`;
  return content;
}
