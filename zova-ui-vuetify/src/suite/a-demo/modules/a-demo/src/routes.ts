import Style from './page/style/index.vue';
import Component from './page/component/index.vue';
import State from './page/state/index.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [
  { path: 'state', component: State, meta: { tab: { title: 'State' } } },
  { path: 'component', component: Component, meta: { tab: { title: 'Component' } } },
  { path: 'style', component: Style, meta: { tab: { title: 'Style' } } },
];
