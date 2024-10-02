import { BeanControllerPageBase, Local, zz } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({
  tabName: zz.string().optional().default('boolean'),
  private: zz.boolean().optional(),
  user: zz
    .json({
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

  toggleUser() {
    const user = this.$query.user?.name === 'tom' ? { name: 'kevin', age: 18 } : { name: 'tom', age: 6 };
    const query = { ...this.$query, user };
    const url = this.$router.resolvePath('/a/demo/routeQuery2', query);
    this.$router.push(url);
  }

  toggleTodos() {
    const todo =
      (this.$query.todos?.length ?? 0) % 2 === 0 ? { title: 'Running', done: false } : { title: 'Eating', done: true };
    const todos = this.$query.todos ? [todo].concat(this.$query.todos) : [todo];
    const query = { ...this.$query, todos };
    const url = this.$router.resolvePath('/a/demo/routeQuery2', query);
    this.$router.push(url);
  }

  toggleTab(event, tabName: string) {
    const checked = event.target.checked;
    if (!checked) return;
    const query = { ...this.$query, tabName };
    const url = this.$router.resolvePath('/a/demo/routeQuery2', query);
    this.$router.push(url);
  }
}
