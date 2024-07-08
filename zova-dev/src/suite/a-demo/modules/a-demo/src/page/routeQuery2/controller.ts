import { BeanControllerPageBase, Local, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({
  private: zz.boolean().optional(),
  user: zz
    .object({
      name: zz.string(),
      age: zz.number(),
    })
    .optional(),
  todos: zz
    .array(
      zz.object({
        title: zz.string(),
        done: zz.boolean(),
      }),
    )
    .optional(),
});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageRouteQuery2 extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  protected async __init__() {}

  protected __dispose__() {}
}
