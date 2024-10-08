module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    if (ast.includes('export interface Props')) throw new Error('Props exists');
    const matchController = ast.match(/export class ([^< ]*)(.*?) extends/);
    const className = matchController[1];
    const hasGeneric = !!matchController[2];
    const genericT = hasGeneric ? '<T>' : '';
    const genericT2 = hasGeneric ? '<_T>' : '';
    const hasSlots = ast.includes('export interface Slots');
    // PropsBase
    if (!ast.match(/import \{[^\}]*PropsBase[^\}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^\}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, PropsBase } from 'zova';`;
      });
    }
    ast = ast.replace(
      '@Local',
      `export interface Props${hasSlots ? genericT : genericT2} extends PropsBase<${className}${genericT}${hasSlots ? `, Slots${genericT}` : ''}> {}\n\n@Local`,
    );
    // BeanControllerBase
    ast = ast.replace(/BeanControllerBase<(.*?)> \{/, (_, $1) => {
      const parts = $1.split(',');
      parts[1] = ` Props${genericT}`;
      return `BeanControllerBase<${parts.join(',')}> {\n  static $propsDefault = {};\n\n`;
    });
    // ok
    return ast;
  },
};
