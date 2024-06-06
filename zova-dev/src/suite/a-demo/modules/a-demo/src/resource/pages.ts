export * as NSControllerPageLocale from '../page/locale/controller.js';
import * as NSControllerPageLocale from '../page/locale/controller.js';
// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/demo/locale': NSControllerPageLocale.QueryInput;
  }
  export interface IPageNameRecord {
    // 'a-demo:page-name': TypePageParamsQuery<NSControllerPagePageName.QueryInput, NSControllerPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {
  '/a/demo/locale': {
    query: NSControllerPageLocale.QuerySchema,
  },
};

export const pageNameSchemas = {
  // 'a-demo:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
