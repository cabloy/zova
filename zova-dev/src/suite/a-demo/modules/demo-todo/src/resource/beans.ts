export * from '../bean/store.todo.js';
import { StoreTodo } from '../bean/store.todo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-todo.store.todo': StoreTodo;
  }
}
