const __snippet_export = `export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;\n`;
const __snippet_type = '@Local() export class $_$0 extends $_$1<$$$1> {$$$2}';

module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    if (ast.includes('export interface Props<')) return;
    const matchController = ast.match(/export class (.*?) extends/);
    const className = matchController[1];
    ast = ast
      .replace('export interface Props', 'export interface Props<T>')
      .replace(`${className}, Slots`, `${className}<T>, Slots<T>`)
      .replace('export type Emits', 'export type Emits<_T>')
      .replace('export interface Slots', 'export interface Slots<_T>')
      .replace(`export class ${className}`, `export class ${className}<T = unknown>`)
      .replace('ScopeModule, Props, Emits, Slots', 'ScopeModule, Props<T>, Emits<T>, Slots<T>');
    // ok
    return ast;
  },
};
