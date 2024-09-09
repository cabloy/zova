/** pages: begin */
export * as NSControllerPageHome from '../page/home/controller.js';
import * as NSControllerPageHome from '../page/home/controller.js';
export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/home/home': NSControllerPageHome.QueryInput;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {
  '/a/home/home': {
    query: NSControllerPageHome.QuerySchema,
  },
};
export const pageNameSchemas = {};
/** pages: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAHome extends BeanScopeBase {}

export interface ScopeModuleAHome
  extends TypeModuleResource<any, any, any, (typeof locales)[TypeLocaleBase], any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-home': ScopeModuleAHome;
  }

  export interface IBeanScopeLocale {
    'a-home': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
