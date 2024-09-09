/** beans: begin */
export * from '../bean/model.todo.js';
import { ModelTodo } from '../bean/model.todo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-todo.model.todo': ModelTodo;
  }
}
/** beans: end */
/** pages: begin */
export * as NSControllerPageItem from '../page/item/controller.js';
export * as NSControllerPageTodo from '../page/todo/controller.js';
import * as NSControllerPageItem from '../page/item/controller.js';
import * as NSControllerPageTodo from '../page/todo/controller.js';
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/todo/todo': NSControllerPageTodo.QueryInput;
  }
  export interface IPageNameRecord {
    'demo-todo:item': TypePageParamsQuery<NSControllerPageItem.QueryInput, NSControllerPageItem.ParamsInput>;
  }
}
export const pagePathSchemas = {
  '/demo/todo/todo': {
    query: NSControllerPageTodo.QuerySchema,
  },
};
export const pageNameSchemas = {
  'demo-todo:item': {
    params: NSControllerPageItem.ParamsSchema,
    query: NSControllerPageItem.QuerySchema,
  },
};
/** pages: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** constant: begin */
export * from '../config/constants.js';
import { constants } from '../config/constants.js';
/** constant: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** service: begin */
import service_todo from '../service/todo.js';
export const services = {
  todo: service_todo,
};
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleDemoTodo extends BeanScopeBase {}

export interface ScopeModuleDemoTodo
  extends TypeModuleResource<
    any,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants,
    typeof services
  > {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-todo': ScopeModuleDemoTodo;
  }

  export interface IBeanScopeConfig {
    'demo-todo': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'demo-todo': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
