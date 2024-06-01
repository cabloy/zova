const __snippet_declare = "import 'cabloy-module-api-<%=argv.moduleInfo.relativeName%>';";

module.exports = {
  file: 'src/index.ts',
  async transform({ cli, ast }) {
    // code
    const code = await cli.template.renderContent({ content: __snippet_declare });
    ast.before(code);
    // ok
    return ast;
  },
};
