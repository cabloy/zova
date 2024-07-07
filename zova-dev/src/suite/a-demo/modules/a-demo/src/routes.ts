import RouteParams from './page/routeParams/index.vue';
import RouteQuery from './page/routeQuery/index.vue';
import Pinia from './page/pinia/index.vue';
import Style from './page/style/index.vue';
import Locale from './page/locale/index.vue';
import Component from './page/component/index.vue';
import State from './page/state/index.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [
  { path: 'state', component: State },
  { path: 'component', component: Component },
  { path: 'locale', component: Locale },
  { path: 'style', component: Style },
  { path: 'pinia', component: Pinia },
  { path: 'routeQuery', component: RouteQuery, meta: { tabKey: route => route.path } },
  { path: 'routeParams', component: RouteParams },
];
