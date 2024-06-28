export * from '../bean/data.todo.js';
import { ModelTodo } from '../bean/data.todo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-todo.model.todo': ModelTodo;
  }
}
