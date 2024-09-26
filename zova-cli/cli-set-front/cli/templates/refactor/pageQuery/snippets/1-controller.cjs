const __snippet_export = `export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;\n`;

module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    // check if exists
    if (ast.includes('export type QueryInput')) throw new Error('Query exists');
    // zz
    if (!ast.match(/import \{[^\}]*zz[^\}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^\}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, zz } from 'zova';`;
      });
    }
    // export
    ast = ast.replace('@Local', `${__snippet_export}\n@Local`);
    // BeanControllerPageBase
    ast = ast.replace(/BeanControllerPageBase<(.*?)> \{/, (_, $1) => {
      const parts = $1.split(',');
      parts[1] = ' QueryOutput';
      return `BeanControllerPageBase<${parts.join(',')}> {`;
    });
    // ok
    return ast;
  },
};
