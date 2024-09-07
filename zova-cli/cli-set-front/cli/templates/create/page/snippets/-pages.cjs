const __snippet_export =
  "export * as NSControllerPage<%=argv.nameMeta.fullCapitalize%> from '../page/<%=argv.pageName%>/controller.js';\n";
const __snippet_import =
  "import * as NSControllerPage<%=argv.nameMeta.fullCapitalize%> from '../page/<%=argv.pageName%>/controller.js';\n";
const __snippet_iPagePathRecord =
  "'/<%=argv.moduleInfo.pid%>/<%=argv.moduleInfo.name%>/<%=argv.pageName%>': NSControllerPage<%=argv.nameMeta.fullCapitalize%>.QueryInput;\n";
const __snippet_pagePathSchemas = `'/<%=argv.moduleInfo.pid%>/<%=argv.moduleInfo.name%>/<%=argv.pageName%>': {
    query: NSControllerPage<%=argv.nameMeta.fullCapitalize%>.QuerySchema,
  },
`;

module.exports = {
  file: 'src/resource/pages.ts',
  init: `// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {}
  export interface IPageNameRecord {
    // '<%=argv.moduleInfo.relativeName%>:page-name': TypePageParamsQuery<NSControllerPagePageName.QueryInput, NSControllerPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {};

export const pageNameSchemas = {
  // '<%=argv.moduleInfo.relativeName%>:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
`,
  async transform({ cli, ast }) {
    // export
    let code = await cli.template.renderContent({ content: __snippet_export });
    ast.before(code);
    // import
    code = await cli.template.renderContent({ content: __snippet_import });
    ast.find("import 'zova'").before(code);
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
