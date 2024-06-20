export * as NSControllerPageTodo from '../page/todo/controller.js';
import * as NSControllerPageTodo from '../page/todo/controller.js';
// import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/todo/todo': NSControllerPageTodo.QueryInput;
  }
  export interface IPageNameRecord {
    // 'demo-todo:page-name': TypePageParamsQuery<NSControllerPagePageName.QueryInput, NSControllerPagePageName.ParamsInput>;
  }
}

export const pagePathSchemas = {
  '/demo/todo/todo': {
    query: NSControllerPageTodo.QuerySchema,
  },
};

export const pageNameSchemas = {
  // 'demo-todo:page-name': {
  //   params: NSControllerPagePageName.ParamsSchema,
  //   query: NSControllerPagePageName.QuerySchema,
  // },
};
