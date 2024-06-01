import ErrorNotFound from './page/errorNotFound/index.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [
  {
    path: '/',
    redirect: '/a/home/home',
    meta: {
      absolute: true,
      requiresAuth: false,
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
    meta: {
      absolute: true,
      layout: 'empty',
      requiresAuth: false,
    },
  },
];
