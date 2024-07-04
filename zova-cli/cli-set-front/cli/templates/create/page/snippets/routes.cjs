const __snippet_declare = "import <%=argv.nameMeta.fullCapitalize%> from './page/<%=argv.pageName%>/index.vue';\n";
const __snippet_body =
  "{ path: '<%=argv.pageName%>', component: <%=argv.nameMeta.fullCapitalize%>, meta: { tab: { title: '' } } },";

module.exports = {
  file: 'src/routes.ts',
  async transform({ cli, ast }) {
    // code
    let code = await cli.template.renderContent({ content: __snippet_declare });
    ast.before(code);
    code = await cli.template.renderContent({ content: __snippet_body });
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
