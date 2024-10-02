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
export * as NSControllerPageState from '../page/state/controller.js';

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/basic/component': undefined;
    '/demo/basic/state': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
/** pages: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleDemoBasic extends BeanScopeBase {}

export interface ScopeModuleDemoBasic extends TypeModuleResource<any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-basic': ScopeModuleDemoBasic;
  }
}
/** scope: end */
