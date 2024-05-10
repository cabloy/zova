const __snippet_export = "export * from './pages.js';";

module.exports = {
  file: 'src/resource/index.ts',
  async transform({ cli, ast }) {
    if (ast.has(__snippet_export)) return undefined;
    // export
    const code = await cli.template.renderContent({ content: __snippet_export });
    ast.append(code);
    // ok
    return ast;
  },
};
