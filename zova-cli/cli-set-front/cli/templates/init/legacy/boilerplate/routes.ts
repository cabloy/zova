import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [{ path: '/legacy/counter', component: () => import('./pages/counter.vue') }];
