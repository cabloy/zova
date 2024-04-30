const __snippet_export = "export * from '../controller/<%=argv.controllerName%>.js';";

module.exports = {
  file: 'src/resource/controllers.ts',
  async transform({ cli, ast }) {
    // code
    const code = await cli.template.renderContent({ content: __snippet_export });
    ast.before(code);
    // ok
    return ast;
  },
};
