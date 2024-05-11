const __snippet_export =
  "export * as NSMother<%=argv.componentNameFullCapitalize%> from '../component/<%=argv.componentName%>/mother.js';\n";
const __snippet_import = "import <%=argv.nameMeta.full%> from '../component/<%=argv.componentName%>/index.vue';\n";
const __snippet_interface = '<%=argv.nameMeta.full%>,\n';

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
    // ok
    return ast;
  },
};
