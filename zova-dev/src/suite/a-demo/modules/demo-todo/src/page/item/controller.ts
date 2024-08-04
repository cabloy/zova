import { BeanControllerPageBase, Local, Use, useComputed, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelTodo } from '../../bean/model.todo.js';
import { ServiceTodoGetParams } from '../../api/index.js';

export const ParamsSchema = zz.object({
  id: zz.string(),
});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageItem extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use()
  $$modelTodo: ModelTodo;
  currentTodo?: ServiceTodoGetParams;

  protected async __init__() {
    this.currentTodo = useComputed(() => {
      return { id: this.$params.id };
    });
  }

  protected __dispose__() {}
}
