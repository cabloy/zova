import { BeanControllerPageBase, Local, Use, uuid, zz } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';
import { ModelTodo } from '../../bean/model.todo.js';
import { ServiceTodoEntity, ServiceTodoGetParams } from '../../service/todo.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageTodo extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use()
  $$modelTodo: ModelTodo;
  newTitle: string;
  currentTodo?: ServiceTodoGetParams;

  protected async __init__() {
    // todos
    const queryTodos = this.$$modelTodo.select();
    await queryTodos.suspense();
    if (queryTodos.error) throw queryTodos.error;
  }

  async addTodo() {
    const todo = {
      id: uuid(),
      title: this.newTitle,
      done: false,
    };
    await this.$$modelTodo.insert().mutateAsync(todo);
    this.newTitle = '';
  }

  async completeTodo(item: ServiceTodoEntity) {
    const todo = { ...item, title: `${item.title}!`, done: true };
    await this.$$modelTodo.update().mutateAsync(todo);
  }

  async deleteTodo(item: ServiceTodoEntity) {
    await this.$$modelTodo.delete().mutateAsync({ id: item.id });
  }
}
