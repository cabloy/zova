const __snippet_export =
  "export * as NSMotherPage<%=argv.nameMeta.fullCapitalize%> from '../page/<%=argv.pageName%>/mother.js';\n";
const __snippet_import =
  "import * as NSMotherPage<%=argv.nameMeta.fullCapitalize%> from '../page/<%=argv.pageName%>/mother.js';\n";
const __snippet_interface =
  "'/<%=argv.moduleInfo.pid%>/<%=argv.moduleInfo.name%>/<%=argv.pageName%>': NSMotherPage<%=argv.nameMeta.fullCapitalize%>.Query;\n";

module.exports = {
  file: 'src/resource/pages.ts',
  init: `// import { TypePageParamsQuery } from "@cabloy/front";
declare module "@cabloy/front" {
  export interface IPagePathRecord {}
  export interface IPageNameRecord {
    // '<%=argv.moduleInfo.relativeName%>:page-name': TypePageParamsQuery<NSMotherPagePageName.Params, NSMotherPagePageName.Query>;
  }
}
`,
  async transform({ cli, ast }) {
    // export
    let code = await cli.template.renderContent({ content: __snippet_export });
    ast.before(code);
    // import
    code = await cli.template.renderContent({ content: __snippet_import });
    ast.find("declare module '@cabloy/front'").before(code);
    // interface
    code = await cli.template.renderContent({ content: __snippet_interface });
    ast.replace('export interface IPagePathRecord {$$$0}', `export interface IPagePathRecord {$$$0 \n ${code}}`);
    // ok
    return ast;
  },
};
