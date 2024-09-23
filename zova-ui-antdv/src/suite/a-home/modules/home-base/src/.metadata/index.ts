/** beans: begin */
export * from '../bean/bean.api.js';
export * from '../bean/style.default.js';
export * from '../bean/theme.default.js';
import { BeanApi } from '../bean/bean.api.js';
import { StyleDefault } from '../bean/style.default.js';
import { ThemeDefault } from '../bean/theme.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-base.bean.api': BeanApi;
    'home-base.style.default': StyleDefault;
    'home-base.theme.default': ThemeDefault;
  }
}
/** beans: end */
/** components: begin */
export * as NSControllerPage from '../component/page/controller.js';
import * as NSControllerPage from '../component/page/controller.js';
export { default as ZPage } from '../component/page/index.vue';
import ZPage from '../component/page/index.vue';
export const components = {
  page: ZPage,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-base:page': NSControllerPage.ControllerPage;
  }
}
/** components: end */
/** pages: begin */
export * as NSControllerPageErrorNotFound from '../page/errorNotFound/controller.js';

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/base//:catchAll(.*)*': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
/** pages: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase extends TypeModuleResource<any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }
}
/** scope: end */
