/** beans: begin */
export * from '../bean/store.counter.js';
export * from '../bean/theme.orange.js';
import { StoreCounter } from '../bean/store.counter.js';
import { ThemeOrange } from '../bean/theme.orange.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-demo.store.counter': StoreCounter;
    'a-demo.theme.orange': ThemeOrange;
  }
}
/** beans: end */
/** components: begin */
export * as NSControllerCard from '../component/card/controller.js';
import * as NSControllerCard from '../component/card/controller.js';
import component_card from '../component/card/index.vue';
export const components = {
  card: component_card,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'a-demo:card': NSControllerCard.ControllerCard;
  }
}
/** components: end */
/** pages: begin */
export * as NSControllerPageComponent from '../page/component/controller.js';
export * as NSControllerPageRouteQuery from '../page/routeQuery/controller.js';
export * as NSControllerPageRouteQuery2 from '../page/routeQuery2/controller.js';
export * as NSControllerPageState from '../page/state/controller.js';
export * as NSControllerPageLocale from '../page/locale/controller.js';
export * as NSControllerPageRouteParams from '../page/routeParams/controller.js';
export * as NSControllerPagePinia from '../page/pinia/controller.js';
export * as NSControllerPageStyle from '../page/style/controller.js';
import * as NSControllerPageRouteQuery from '../page/routeQuery/controller.js';
import * as NSControllerPageRouteQuery2 from '../page/routeQuery2/controller.js';
import * as NSControllerPageLocale from '../page/locale/controller.js';
import * as NSControllerPageRouteParams from '../page/routeParams/controller.js';
import * as NSControllerPagePinia from '../page/pinia/controller.js';
import * as NSControllerPageStyle from '../page/style/controller.js';
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/demo/routeQuery': NSControllerPageRouteQuery.QueryInput;
    '/a/demo/routeQuery2': NSControllerPageRouteQuery2.QueryInput;
    '/a/demo/locale': NSControllerPageLocale.QueryInput;
    '/a/demo/pinia': NSControllerPagePinia.QueryInput;
    '/a/demo/style': NSControllerPageStyle.QueryInput;
  }
  export interface IPageNameRecord {
    'a-demo:routeParams': TypePageParamsQuery<
      NSControllerPageRouteParams.QueryInput,
      NSControllerPageRouteParams.ParamsInput
    >;
  }
}
export const pagePathSchemas = {
  '/a/demo/routeQuery': {
    query: NSControllerPageRouteQuery.QuerySchema,
  },
  '/a/demo/routeQuery2': {
    query: NSControllerPageRouteQuery2.QuerySchema,
  },
  '/a/demo/locale': {
    query: NSControllerPageLocale.QuerySchema,
  },
  '/a/demo/pinia': {
    query: NSControllerPagePinia.QuerySchema,
  },
  '/a/demo/style': {
    query: NSControllerPageStyle.QuerySchema,
  },
};
export const pageNameSchemas = {
  'a-demo:routeParams': {
    params: NSControllerPageRouteParams.ParamsSchema,
    query: NSControllerPageRouteParams.QuerySchema,
  },
};
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
export class ScopeModuleADemo extends BeanScopeBase {}

export interface ScopeModuleADemo
  extends TypeModuleResource<typeof components, any, any, (typeof locales)[TypeLocaleBase], any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-demo': ScopeModuleADemo;
  }

  export interface IBeanScopeLocale {
    'a-demo': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
