/** beans: begin */
export * from '../bean/theme.orange.js';
export * from '../bean/themeDark.js';
export * from '../bean/themeLight.js';
import { ThemeOrange } from '../bean/theme.orange.js';
import { ThemeDark } from '../bean/themeDark.js';
import { ThemeLight } from '../bean/themeLight.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-demo.theme.orange': ThemeOrange;
    'a-demo.themeDark': ThemeDark;
    'a-demo.themeLight': ThemeLight;
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
export * as NSControllerPageState from '../page/state/controller.js';
export * as NSControllerPageStyle from '../page/style/controller.js';
import * as NSControllerPageComponent from '../page/component/controller.js';
import * as NSControllerPageState from '../page/state/controller.js';
import * as NSControllerPageStyle from '../page/style/controller.js';
export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/a/demo/component': NSControllerPageComponent.QueryInput;
    '/a/demo/state': NSControllerPageState.QueryInput;
    '/a/demo/style': NSControllerPageStyle.QueryInput;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {
  '/a/demo/component': {
    query: NSControllerPageComponent.QuerySchema,
  },
  '/a/demo/state': {
    query: NSControllerPageState.QuerySchema,
  },
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

export interface ScopeModuleADemo extends TypeModuleResource<typeof components, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-demo': ScopeModuleADemo;
  }
}
/** scope: end */
