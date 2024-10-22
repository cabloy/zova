/** beans: begin */
export * from '../bean/model.menu.js';
import { ModelMenu } from '../bean/model.menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-layout.model.menu': ModelMenu;
  }
}
/** beans: end */
/** components: begin */
export { ControllerLayoutDefault } from '../component/layoutDefault/controller.js';
export * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
export { ControllerLayoutEmpty } from '../component/layoutEmpty/controller.js';
export * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
import * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
import * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
export { default as ZLayoutDefault } from '../component/layoutDefault/index.vue';
import ZLayoutDefault from '../component/layoutDefault/index.vue';
export { default as ZLayoutEmpty } from '../component/layoutEmpty/index.vue';
import ZLayoutEmpty from '../component/layoutEmpty/index.vue';
export const components = {
  layoutDefault: ZLayoutDefault,
  layoutEmpty: ZLayoutEmpty,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-layout:layoutDefault': NSControllerLayoutDefault.ControllerLayoutDefault;
    'home-layout:layoutEmpty': NSControllerLayoutEmpty.ControllerLayoutEmpty;
  }
}
/** components: end */
/** service: begin */
import service_menu from '../service/menu.js';
export const services = {
  menu: service_menu,
};
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout extends TypeModuleResource<any, any, any, any, typeof services> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-layout': ScopeModuleHomeLayout;
  }
}
/** scope: end */
