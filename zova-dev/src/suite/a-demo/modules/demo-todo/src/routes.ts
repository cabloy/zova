import Item from './page/item/index.vue';
import Todo from './page/todo/index.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [
  { path: 'todo', component: Todo },
  { name: 'item', path: 'item/:id?', component: Item },
];
