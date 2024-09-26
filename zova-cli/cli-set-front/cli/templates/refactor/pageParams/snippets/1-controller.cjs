const __snippet_export = `export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;\n`;
const __snippet_type = '@Local() export class $_$0 extends $_$1<$$$1> {$$$2}';

module.exports = {
  file: 'controller.ts',
  async transform({ cli, ast }) {
    // check if exists
    if (ast.has('export type ParamsInput = zz.input<typeof ParamsSchema>')) {
      return;
    }
    // export
    const code = await cli.template.renderContent({ content: __snippet_export });
    ast.find('@Local() export class $_$0 {}').before(code);
    // zz
    if (!ast.has("import { $$$0, zz } from 'zova'")) {
      ast.replace("import { $$$0 } from 'zova'", "import { $$$0, zz } from 'zova'");
    }
    // type
    const res = ast.find(__snippet_type);
    const typeNames = res.match['$$$1'].map(item => item.typeName?.name);
    if (!typeNames[0]) typeNames[0] = 'ScopeModule';
    if (!typeNames[1]) typeNames[1] = 'unknown';
    if (!typeNames[2]) typeNames[2] = 'ParamsOutput';
    ast.replace(
      __snippet_type,
      __snippet_type
        .replace('$_$0', res.match[0][0].value)
        .replace('$_$1', res.match[1][0].value)
        .replace('$$$1', typeNames.join(', ')),
    );
    // ok
    return ast;
  },
};
