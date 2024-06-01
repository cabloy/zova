const __snippet = `// <%=argv.controllerName%>
{ method: 'post', path: '<%=argv.controllerName%>/action', controller: '<%=argv.controllerName%>' },`;

module.exports = {
  file: 'src/routes.ts',
  async transform({ cli, ast }) {
    // code
    const code = await cli.template.renderContent({ content: __snippet });
    if (!ast.has('export const routes: IModuleRoute[] = [$_$]')) {
      ast.replace('export const routes: IModuleRoute[] = []', `export const routes: IModuleRoute[] = [${code}]`);
    } else {
      ast.replace(
        'export const routes: IModuleRoute[] = [$_$]',
        `export const routes: IModuleRoute[] = [$_$, \n ${code}]`,
      );
    }
    // ok
    return ast;
  },
};
