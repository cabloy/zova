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
  togglePrivate() {
    const _private = this.$query.private ? false : true;
    const query = { ...this.$query, private: _private };
    const url = this.$router.resolvePath('/a/demo/routeQuery2', query);
    this.$router.push(url);
  }
}
