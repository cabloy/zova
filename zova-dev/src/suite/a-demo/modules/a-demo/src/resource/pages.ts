export * as NSControllerPageRouteParams from '../page/routeParams/controller.js';
export * as NSControllerPageRouteQuery from '../page/routeQuery/controller.js';
export * as NSControllerPagePinia from '../page/pinia/controller.js';
export * as NSControllerPageStyle from '../page/style/controller.js';
export * as NSControllerPageLocale from '../page/locale/controller.js';
import * as NSControllerPageLocale from '../page/locale/controller.js';
import * as NSControllerPageStyle from '../page/style/controller.js';
import * as NSControllerPagePinia from '../page/pinia/controller.js';
import * as NSControllerPageRouteQuery from '../page/routeQuery/controller.js';
import * as NSControllerPageRouteParams from '../page/routeParams/controller.js';
// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/demo/locale': NSControllerPageLocale.QueryInput;
    '/a/demo/style': NSControllerPageStyle.QueryInput;
    '/a/demo/pinia': NSControllerPagePinia.QueryInput;
    '/a/demo/routeQuery': NSControllerPageRouteQuery.QueryInput;
    '/a/demo/routeParams': NSControllerPageRouteParams.QueryInput;
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
  '/a/demo/routeQuery': {
    query: NSControllerPageRouteQuery.QuerySchema,
  },
  '/a/demo/routeParams': {
    query: NSControllerPageRouteParams.QuerySchema,
  },
};

export const pageNameSchemas = {
  // 'a-demo:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
