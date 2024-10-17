module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ cli, ast }) {
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
    // RequiredSome
    if (!ast.match(/import \{[^\}]*RequiredSome[^\}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^\}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, RequiredSome } from 'zova';`;
      });
    }
    // Props
    ast = ast.replace(
      '@Local',
      `export interface Props${hasSlots ? genericT : genericT2} extends PropsBase<${className}${genericT}${hasSlots ? `, Slots${genericT}` : ''}> {}\n\n@Local`,
    );
    // BeanControllerBase
    ast = ast.replace(/BeanControllerBase<([\s\S]*?)> \{/, (_, $1) => {
      const parts = cli.helper.safeSplit($1, ',');
      parts[1] = ` RequiredSome<Props${genericT}, keyof typeof ${className}.$propsDefault>`;
      return `BeanControllerBase<${parts.join(',')}> {\n  static $propsDefault = {};\n\n`;
    });
    // ok
    return ast;
  },
};
