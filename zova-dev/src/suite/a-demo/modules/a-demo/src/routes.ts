import Pinia from './page/pinia/index.vue';
import Style from './page/style/index.vue';
import Locale from './page/locale/index.vue';
import Component from './page/component/index.vue';
import State from './page/state/index.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [
  { path: 'state', component: State, meta: { tab: { title: 'State' } } },
  { path: 'component', component: Component, meta: { tab: { title: 'Component' } } },
  { path: 'locale', component: Locale, meta: { tab: { title: 'Locale' } } },
  { path: 'style', component: Style, meta: { tab: { title: 'Style' } } },
  { path: 'pinia', component: Pinia, meta: { tab: { title: 'Pinia' } } },
];
