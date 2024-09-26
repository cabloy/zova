const __snippet_export = `export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;\n`;
const __snippet_type = '@Local() export class $_$0 extends $_$1<$$$1> {$$$2}';

module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    if (ast.includes('export interface Props')) throw new Error('Props exists');
    const matchController = ast.match(/export class ([^< ]*)(.*?) extends/);
    const className = matchController[1];
    const hasGeneric = !!matchController[2];
    const genericT = hasGeneric ? '<T>' : '';
    const hasSlots = ast.includes('export interface Slots');
    // PropsBase
    if (!ast.match(/import \{[^\}]*PropsBase[^\}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^\}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, PropsBase } from 'zova';`;
      });
    }
    ast = ast.replace(
      '@Local',
      `export interface Props${genericT} extends PropsBase<${className}${genericT}${hasSlots ? `, Slots${genericT}` : ''}> {}\n\n@Local`,
    );

    // ok
    return ast;
  },
};
