export * from '../bean/data.todo.js';
import { DataTodo } from '../bean/data.todo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-todo.data.todo': DataTodo;
  }
}
