/** beans: begin */
export * from '../bean/model.tabs.js';
import { ModelTabs } from '../bean/model.tabs.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-tabs.model.tabs': ModelTabs;
  }
}
/** beans: end */
/** components: begin */
export * as NSControllerRouterViewTabs from '../component/routerViewTabs/controller.js';
import * as NSControllerRouterViewTabs from '../component/routerViewTabs/controller.js';
import component_routerViewTabs from '../component/routerViewTabs/index.vue';
export const components = {
  routerViewTabs: component_routerViewTabs,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'a-tabs:routerViewTabs': NSControllerRouterViewTabs.ControllerRouterViewTabs;
  }
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleATabs extends BeanScopeBase {}

export interface ScopeModuleATabs extends TypeModuleResource<typeof components, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-tabs': ScopeModuleATabs;
  }
}
/** scope: end */
