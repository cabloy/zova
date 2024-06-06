const __snippet_export = `export * as NSController<%=argv.nameMeta.fullCapitalize%> from '../component/<%=argv.componentName%>/controller.js';
import * as NSController<%=argv.nameMeta.fullCapitalize%> from '../component/<%=argv.componentName%>/controller.js';\n`;
const __snippet_import = "import <%=argv.nameMeta.full%> from '../component/<%=argv.componentName%>/index.vue';\n";
const __snippet_interface = '<%=argv.nameMeta.full%>,\n';
const __snippet_zova = `
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {}
}`;
const __snippet_iComponentRecord =
  "'<%=argv.moduleInfo.relativeName%>:<%=argv.nameMeta.full%>': NSController<%=argv.nameMeta.fullCapitalize%>.Controller<%=argv.nameMeta.fullCapitalize%>;\n";

module.exports = {
  file: 'src/resource/components.ts',
  async transform({ cli, ast }) {
    // export
    let code = await cli.template.renderContent({ content: __snippet_export });
    ast.before(code);
    // import
    code = await cli.template.renderContent({ content: __snippet_import });
    ast.find('export const components = {$$$0}').before(code);
    // interface
    code = await cli.template.renderContent({ content: __snippet_interface });
    ast.replace('export const components = {$$$0}', `export const components = {$$$0, ${code}}`);
    // interface IComponentRecord
    if (!ast.has("import 'zova'")) {
      code = await cli.template.renderContent({ content: __snippet_zova });
      ast.find('export const components = {$$$0}').after(code);
    }
    code = await cli.template.renderContent({ content: __snippet_iComponentRecord });
    ast.replace('export interface IComponentRecord {$$$0}', `export interface IComponentRecord {$$$0 \n ${code}}`);
    // ok
    return ast;
  },
};
