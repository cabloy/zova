export * from '../bean/model.todo.js';
import { ModelTodo } from '../bean/model.todo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-todo.model.todo': ModelTodo;
  }
}
