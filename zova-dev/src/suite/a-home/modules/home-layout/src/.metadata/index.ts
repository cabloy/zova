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
export { ControllerEssentialLink } from '../component/essentialLink/controller.js';
export * as NSControllerEssentialLink from '../component/essentialLink/controller.js';
export { ControllerLayoutDefault } from '../component/layoutDefault/controller.js';
export * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
export { ControllerLayoutEmpty } from '../component/layoutEmpty/controller.js';
export * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
import * as NSControllerEssentialLink from '../component/essentialLink/controller.js';
import * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
import * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
export { default as ZEssentialLink } from '../component/essentialLink/index.vue';
import ZEssentialLink from '../component/essentialLink/index.vue';
export { default as ZLayoutDefault } from '../component/layoutDefault/index.vue';
import ZLayoutDefault from '../component/layoutDefault/index.vue';
export { default as ZLayoutEmpty } from '../component/layoutEmpty/index.vue';
import ZLayoutEmpty from '../component/layoutEmpty/index.vue';
export const components = {
  essentialLink: ZEssentialLink,
  layoutDefault: ZLayoutDefault,
  layoutEmpty: ZLayoutEmpty,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-layout:essentialLink': NSControllerEssentialLink.ControllerEssentialLink;
    'home-layout:layoutDefault': NSControllerLayoutDefault.ControllerLayoutDefault;
    'home-layout:layoutEmpty': NSControllerLayoutEmpty.ControllerLayoutEmpty;
  }
}
/** components: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** service: begin */
import service_menu from '../service/menu.js';
export const services = {
  menu: service_menu,
};
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, typeof services> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-layout': ScopeModuleHomeLayout;
  }

  export interface IBeanScopeConfig {
    'home-layout': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-layout': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
