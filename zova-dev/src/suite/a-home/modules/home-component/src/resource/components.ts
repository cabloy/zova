export * as NSControllerPage from '../component/page/controller.js';
import * as NSControllerPage from '../component/page/controller.js';
import page from '../component/page/index.vue';
export const components = { page };
declare module 'zova' {
  export interface IComponentRecord {
    'home-component:page': NSControllerPage.ControllerPage;
  }
}
import 'zova';
