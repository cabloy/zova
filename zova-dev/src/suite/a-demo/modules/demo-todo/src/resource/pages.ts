export * as NSControllerPageItem from '../page/item/controller.js';
export * as NSControllerPageTodo from '../page/todo/controller.js';
import * as NSControllerPageTodo from '../page/todo/controller.js';
import * as NSControllerPageItem from '../page/item/controller.js';
import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/todo/todo': NSControllerPageTodo.QueryInput;
    '/demo/todo/item': NSControllerPageItem.QueryInput;
  }
  export interface IPageNameRecord {
    'demo-todo:item': TypePageParamsQuery<NSControllerPageItem.QueryInput, NSControllerPageItem.ParamsInput>;
  }
}

export const pagePathSchemas = {
  '/demo/todo/todo': {
    query: NSControllerPageTodo.QuerySchema,
  },
  '/demo/todo/item': {
    query: NSControllerPageItem.QuerySchema,
  },
};

export const pageNameSchemas = {
  'demo-todo:item': {
    params: NSControllerPageItem.ParamsSchema,
    query: NSControllerPageItem.QuerySchema,
  },
};
