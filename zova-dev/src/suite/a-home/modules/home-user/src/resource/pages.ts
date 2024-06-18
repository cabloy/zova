export * as NSControllerPageLogin from '../page/login/controller.js';
import * as NSControllerPageLogin from '../page/login/controller.js';
// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/user/login': NSControllerPageLogin.QueryInput;
  }
  export interface IPageNameRecord {
    // 'home-user:page-name': TypePageParamsQuery<NSControllerPagePageName.QueryInput, NSControllerPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {
  '/home/user/login': {
    query: NSControllerPageLogin.QuerySchema,
  },
};

export const pageNameSchemas = {
  // 'home-user:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
