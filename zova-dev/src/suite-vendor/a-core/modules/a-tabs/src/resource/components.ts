export * as NSControllerRouterViewTabs from '../component/routerViewTabs/controller.js';
import * as NSControllerRouterViewTabs from '../component/routerViewTabs/controller.js';
import routerViewTabs from '../component/routerViewTabs/index.vue';
export const components = { routerViewTabs };
declare module 'zova' {
  export interface IComponentRecord {
    'a-tabs:routerViewTabs': NSControllerRouterViewTabs.ControllerRouterViewTabs;
  }
}
import 'zova';
