import layoutDefault from '../component/layoutDefault/index.vue';
import layoutEmpty from '../component/layoutEmpty/index.vue';

export const components = {
  layoutDefault,
  layoutEmpty,
};

export * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
import * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
export * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
import * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';

import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-layout:layoutDefault': typeof NSControllerLayoutDefault;
    'home-layout:layoutEmpty': typeof NSControllerLayoutEmpty;
  }

  export interface IComponentLayoutRecord {
    'home-layout:layoutDefault': typeof NSControllerLayoutDefault;
    'home-layout:layoutEmpty': typeof NSControllerLayoutEmpty;
  }
}
