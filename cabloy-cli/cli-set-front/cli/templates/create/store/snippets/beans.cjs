const __snippet_export = "export * from '../bean/<%=argv.sceneName%>.<%=argv.beanName%>.js';\n";
const __snippet_import =
  "import { <%=argv.sceneNameCapitalize%><%=argv.beanNameCapitalize%> } from '../bean/<%=argv.sceneName%>.<%=argv.beanName%>.js';\n";
const __snippet_interface =
  "'<%=argv.moduleInfo.relativeName%>.<%=argv.sceneName%>.<%=argv.beanName%>': <%=argv.sceneNameCapitalize%><%=argv.beanNameCapitalize%>;\n";

module.exports = {
  file: 'src/resource/beans.ts',
  async transform({ cli, ast }) {
    // export
    let code = await cli.template.renderContent({ content: __snippet_export });
    ast.before(code);
    // import
    code = await cli.template.renderContent({ content: __snippet_import });
    ast.find("declare module '@cabloy/front'").before(code);
    // interface
    code = await cli.template.renderContent({ content: __snippet_interface });
    ast.replace('export interface IBeanRecord {$$$0}', `export interface IBeanRecord {$$$0 ${code}}`);
    // ok
    return ast;
  },
};
