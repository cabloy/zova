import path from 'path';
import eggBornUtils from 'egg-born-utils';

export async function generateServices(modulePath: string) {
  const pattern = `${modulePath}/src/service/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  const contentImports: string[] = [];
  const contentServices: string[] = [];
  for (const file of files) {
    const serviceName = path.basename(file.substring(0, file.length - '.ts'.length));
    const className = 'service_' + serviceName;
    contentImports.push(`import ${className} from '../service/${serviceName}.js';`);
    contentServices.push(`'${serviceName}': ${className},`);
  }
  // combine
  const content = `/** service: begin */
${contentImports.join('\n')}
export const services = {
  ${contentServices.join('\n')}
};
/** service: end */
`;
  return content;
}
