import path from 'path';
import fse from 'fs-extra';

export async function generateMonkey(modulePath: string) {
  const monkeyFile = path.join(modulePath, 'src/monkey.ts');
  if (!fse.existsSync(monkeyFile)) return '';
  // combine
  const content = `/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
`;
  return content;
}
