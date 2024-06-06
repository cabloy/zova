export * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
import * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
export * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
import * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
import layoutDefault from '../component/layoutDefault/index.vue';
import layoutEmpty from '../component/layoutEmpty/index.vue';
export const components = {
  layoutDefault,
  layoutEmpty,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-layout:layoutDefault': NSControllerLayoutDefault.ControllerLayoutDefault;
    'home-layout:layoutEmpty': NSControllerLayoutEmpty.ControllerLayoutEmpty;
  }

  export interface IComponentLayoutRecord {
    'home-layout:layoutDefault': NSControllerLayoutDefault.ControllerLayoutDefault;
    'home-layout:layoutEmpty': NSControllerLayoutEmpty.ControllerLayoutEmpty;
  }
}
