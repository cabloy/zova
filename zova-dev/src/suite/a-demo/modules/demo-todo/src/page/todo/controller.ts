import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { DataTodo } from '../../bean/data.todo.js';
import { ServiceTodoEntity, ServiceTodoGetParams } from '../../api/index.js';

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
  newTitle: string;
  currentTodo?: ServiceTodoGetParams;

  protected async __init__() {}

  async addTodo() {
    const todo = {
      id: this.app.meta.util.uuid(),
      title: this.newTitle,
      done: false,
    };
    await this.$$dataTodo.insert.mutateAsync(todo);
    this.newTitle = '';
  }

  async updateTodo(item: ServiceTodoEntity) {
    const todo = { ...item, title: `${item.title}!` };
    await this.$$dataTodo.update.mutateAsync(todo);
  }
}
