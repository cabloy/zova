const __snippet_export =
  "export * as NSMotherPage<%=argv.pageNameFullCapitalize%> from '../page/<%=argv.pageName%>/mother.js';\n";
const __snippet_import =
  "import * as NSMotherPage<%=argv.pageNameFullCapitalize%> from '../page/<%=argv.pageName%>/mother.js';\n";
const __snippet_interface =
  "'/<%=argv.moduleInfo.pid%>/<%=argv.moduleInfo.name%>/<%=argv.pageName%>': NSMotherPage<%=argv.pageNameFullCapitalize%>.Query;\n";

module.exports = {
  file: 'src/resource/pages.ts',
  init: `// import { TypePageParamsQuery } from "@cabloy/front";
declare module "@cabloy/front" {
  export interface IPagePathRecord {}
  export interface IPageNameRecord {
    // 'test-home2:page-name': TypePageParamsQuery<NSMotherPagePageName.Params, NSMotherPagePageName.Query>;
  }
}
`,
  async transform({ cli, ast }) {
    // export
    let code = await cli.template.renderContent({ content: __snippet_export });
    ast.find("import { TypePageParamsQuery } from '@cabloy/front';").after(code);
    // import
    code = await cli.template.renderContent({ content: __snippet_import });
    ast.find("declare module '@cabloy/front'").before(code);
    // interface
    code = await cli.template.renderContent({ content: __snippet_interface });
    ast.replace('export interface IPagePathRecord {$$$0}', `export interface IPagePathRecord {$$$0 ${code}}`);
    // ok
    return ast;
  },
};
