export * as NSControllerPageLogin from '../page/login/controller.js';
import * as NSControllerPageLogin from '../page/login/controller.js';
// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/user/login': NSControllerPageLogin.QueryInput;
  }
  export interface IPageNameRecord {
    // 'demo-user:page-name': TypePageParamsQuery<NSControllerPagePageName.QueryInput, NSControllerPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {
  '/demo/user/login': {
    query: NSControllerPageLogin.QuerySchema,
  },
};

export const pageNameSchemas = {
  // 'demo-user:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
