const __snippet_export = "export * from '../local/<%=argv.controllerName%>.js';";
const __snippet_import =
  "import { Local<%=argv.controllerNameCapitalize%> } from '../local/<%=argv.controllerName%>.js';";
const __snippet_interface = '<%=argv.controllerName%>: Local<%=argv.controllerNameCapitalize%>;';

module.exports = {
  file: 'src/resource/locals.ts',
  async transform({ cli, ast }) {
    // export
    let code = await cli.template.renderContent({ content: __snippet_export });
    ast.before(code);
    // import
    code = await cli.template.renderContent({ content: __snippet_import });
    ast.find('export interface IModuleLocal {$$$0}').before(code);
    // interface
    code = await cli.template.renderContent({ content: __snippet_interface });
    ast.replace('export interface IModuleLocal {$$$0}', `export interface IModuleLocal {$$$0 ${code}}`);
    // ok
    return ast;
  },
};
