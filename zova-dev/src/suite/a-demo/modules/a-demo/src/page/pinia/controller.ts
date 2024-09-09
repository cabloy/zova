import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';
import type { StoreCounter } from '../../bean/store.counter.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPagePinia extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use('a-demo.store.counter')
  $$counter: StoreCounter;

  protected async __init__() {}
}
