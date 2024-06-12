export * as NSControllerPageStyle from '../page/style/controller.js';
import * as NSControllerPageStyle from '../page/style/controller.js';
// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/demo/style': NSControllerPageStyle.QueryInput;
  }
  export interface IPageNameRecord {
    // 'a-demo:page-name': TypePageParamsQuery<NSControllerPagePageName.QueryInput, NSControllerPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {
  '/a/demo/style': {
    query: NSControllerPageStyle.QuerySchema,
  },
};

export const pageNameSchemas = {
  // 'a-demo:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
