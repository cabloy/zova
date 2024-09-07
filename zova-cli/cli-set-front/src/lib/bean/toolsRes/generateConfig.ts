import path from 'path';
import fse from 'fs-extra';

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
