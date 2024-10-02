/** beans: begin */
export * from '../bean/store.counter.js';
export * from '../bean/theme.orange.js';
import { StoreCounter } from '../bean/store.counter.js';
import { ThemeOrange } from '../bean/theme.orange.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-basic.store.counter': StoreCounter;
    'demo-basic.theme.orange': ThemeOrange;
  }
}
/** beans: end */
/** components: begin */
export * as NSControllerCard from '../component/card/controller.js';
import * as NSControllerCard from '../component/card/controller.js';
export { default as ZCard } from '../component/card/index.vue';
import ZCard from '../component/card/index.vue';
export const components = {
  card: ZCard,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'demo-basic:card': NSControllerCard.ControllerCard;
  }
}
/** components: end */
/** pages: begin */
export * as NSControllerPageComponent from '../page/component/controller.js';
export * as NSControllerPageLegacy from '../page/legacy/controller.js';
export * as NSControllerPageLocale from '../page/locale/controller.js';
export * as NSControllerPagePinia from '../page/pinia/controller.js';
export * as NSControllerPageRouteParams from '../page/routeParams/controller.js';
export * as NSControllerPageRouteQuery from '../page/routeQuery/controller.js';
export * as NSControllerPageRouteQuery2 from '../page/routeQuery2/controller.js';
export * as NSControllerPageState from '../page/state/controller.js';
export * as NSControllerPageStyle from '../page/style/controller.js';
import * as NSControllerPageLocale from '../page/locale/controller.js';
import * as NSControllerPagePinia from '../page/pinia/controller.js';
import * as NSControllerPageRouteParams from '../page/routeParams/controller.js';
import * as NSControllerPageRouteQuery from '../page/routeQuery/controller.js';
import * as NSControllerPageRouteQuery2 from '../page/routeQuery2/controller.js';
import * as NSControllerPageStyle from '../page/style/controller.js';
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/basic/component': undefined;
    '/demo/basic/legacy': undefined;
    '/demo/basic/locale': NSControllerPageLocale.QueryInput;
    '/demo/basic/pinia': NSControllerPagePinia.QueryInput;
    '/demo/basic/routeQuery': NSControllerPageRouteQuery.QueryInput;
    '/demo/basic/routeQuery2': NSControllerPageRouteQuery2.QueryInput;
    '/demo/basic/state': undefined;
    '/demo/basic/style': NSControllerPageStyle.QueryInput;
  }
  export interface IPageNameRecord {
    'demo-basic:routeParams': TypePageParamsQuery<
      NSControllerPageRouteParams.QueryInput,
      NSControllerPageRouteParams.ParamsInput
    >;
  }
}
export const pagePathSchemas = {
  '/demo/basic/locale': {
    query: NSControllerPageLocale.QuerySchema,
  },
  '/demo/basic/pinia': {
    query: NSControllerPagePinia.QuerySchema,
  },
  '/demo/basic/routeQuery': {
    query: NSControllerPageRouteQuery.QuerySchema,
  },
  '/demo/basic/routeQuery2': {
    query: NSControllerPageRouteQuery2.QuerySchema,
  },
  '/demo/basic/style': {
    query: NSControllerPageStyle.QuerySchema,
  },
};
export const pageNameSchemas = {
  'demo-basic:routeParams': {
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
export class ScopeModuleDemoBasic extends BeanScopeBase {}

export interface ScopeModuleDemoBasic
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-basic': ScopeModuleDemoBasic;
  }

  export interface IBeanScopeLocale {
    'demo-basic': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
