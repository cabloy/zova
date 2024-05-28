const __snippet_export =
  "export * as NSMotherPage<%=argv.nameMeta.fullCapitalize%> from '../page/<%=argv.pageName%>/controller.js';\n";
const __snippet_import =
  "import * as NSMotherPage<%=argv.nameMeta.fullCapitalize%> from '../page/<%=argv.pageName%>/controller.js';\n";
const __snippet_iPagePathRecord =
  "'/<%=argv.moduleInfo.pid%>/<%=argv.moduleInfo.name%>/<%=argv.pageName%>': NSMotherPage<%=argv.nameMeta.fullCapitalize%>.QueryInput;\n";
const __snippet_pagePathSchemas = `'/<%=argv.moduleInfo.pid%>/<%=argv.moduleInfo.name%>/<%=argv.pageName%>': {
    query: NSMotherPage<%=argv.nameMeta.fullCapitalize%>.QuerySchema,
  },
`;

module.exports = {
  file: 'src/resource/pages.ts',
  init: `// import { TypePageParamsQuery } from "@cabloy/front";
declare module "@cabloy/front" {
  export interface IPagePathRecord {}
  export interface IPageNameRecord {
    // '<%=argv.moduleInfo.relativeName%>:page-name': TypePageParamsQuery<NSMotherPagePageName.QueryInput, NSMotherPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {};

export const pageNameSchemas = {
  // '<%=argv.moduleInfo.relativeName%>:page-name': {
  //   params: NSMotherPagePageName.ParamsSchema,
  //   query: NSMotherPagePageName.QuerySchema,
  // },
};
`,
  async transform({ cli, ast }) {
    // export
    let code = await cli.template.renderContent({ content: __snippet_export });
    ast.before(code);
    // import
    code = await cli.template.renderContent({ content: __snippet_import });
    ast.find("declare module '@cabloy/front'").before(code);
    // IPagePathRecord
    code = await cli.template.renderContent({ content: __snippet_iPagePathRecord });
    ast.replace('export interface IPagePathRecord {$$$0}', `export interface IPagePathRecord {$$$0 \n ${code}}`);
    // interface
    code = await cli.template.renderContent({ content: __snippet_pagePathSchemas });
    ast.replace('export const pagePathSchemas = {$$$0}', `export const pagePathSchemas = {$$$0, \n ${code}}`);
    // ok
    return ast;
  },
};
