/** components: begin */
export * as NSControllerPage from '../component/page/controller.js';
import * as NSControllerPage from '../component/page/controller.js';
import component_page from '../component/page/index.vue';
export const components = {
  page: component_page,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-component:page': NSControllerPage.ControllerPage;
  }
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeComponent extends BeanScopeBase {}

export interface ScopeModuleHomeComponent extends TypeModuleResource<typeof components, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-component': ScopeModuleHomeComponent;
  }
}
/** scope: end */
