export * as NSControllerPagePinia from '../page/pinia/controller.js';
export * as NSControllerPageStyle from '../page/style/controller.js';
export * as NSControllerPageLocale from '../page/locale/controller.js';
import * as NSControllerPageLocale from '../page/locale/controller.js';
import * as NSControllerPageStyle from '../page/style/controller.js';
import * as NSControllerPagePinia from '../page/pinia/controller.js';
// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/demo/locale': NSControllerPageLocale.QueryInput;
    '/a/demo/style': NSControllerPageStyle.QueryInput;
    '/a/demo/pinia': NSControllerPagePinia.QueryInput;
  }
  export interface IPageNameRecord {
    // 'a-demo:page-name': TypePageParamsQuery<NSControllerPagePageName.QueryInput, NSControllerPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {
  '/a/demo/locale': {
    query: NSControllerPageLocale.QuerySchema,
  },
  '/a/demo/style': {
    query: NSControllerPageStyle.QuerySchema,
  },
  '/a/demo/pinia': {
    query: NSControllerPagePinia.QuerySchema,
  },
};

export const pageNameSchemas = {
  // 'a-demo:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
