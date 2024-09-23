/** beans: begin */
export * from '../bean/theme.orange.js';
import { ThemeOrange } from '../bean/theme.orange.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-demo.theme.orange': ThemeOrange;
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
    'a-demo:card': NSControllerCard.ControllerCard;
  }
}
/** components: end */
/** pages: begin */
export * as NSControllerPageComponent from '../page/component/controller.js';
export * as NSControllerPageState from '../page/state/controller.js';
export * as NSControllerPageStyle from '../page/style/controller.js';
import * as NSControllerPageStyle from '../page/style/controller.js';
export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/demo/component': undefined;
    '/a/demo/state': undefined;
    '/a/demo/style': NSControllerPageStyle.QueryInput;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {
  '/a/demo/style': {
    query: NSControllerPageStyle.QuerySchema,
  },
};
export const pageNameSchemas = {};
/** pages: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleADemo extends BeanScopeBase {}

export interface ScopeModuleADemo extends TypeModuleResource<any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-demo': ScopeModuleADemo;
  }
}
/** scope: end */
