export * as NSControllerPageHome from '../page/home/controller.js';
import * as NSControllerPageHome from '../page/home/controller.js';
// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/home/home': NSControllerPageHome.QueryInput;
  }
  export interface IPageNameRecord {
    // 'a-home:page-name': TypePageParamsQuery<NSControllerPagePageName.QueryInput, NSControllerPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {
  '/a/home/home': {
    query: NSControllerPageHome.QuerySchema,
  },
};

export const pageNameSchemas = {
  // 'a-home:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
