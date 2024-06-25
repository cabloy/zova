import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { DataTodo } from '../../bean/data.todo.js';
import { DataQuery } from 'zova-module-a-data';
import { ServiceTodoEntity } from '../../api/index.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageTodo extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use()
  $$dataTodo: DataTodo;
  queryTodos: DataQuery<ServiceTodoEntity[]>;
  newTitle: string;

  protected async __init__() {
    this.queryTodos = this.$$dataTodo.select();
  }

  async addTodo() {
    const todo = {
      id: this.app.meta.util.uuid(),
      title: this.newTitle,
      done: false,
    };
  }
}
