import Counter from './pages/counter.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [{ path: '/legacy/counter', component: Counter }];
