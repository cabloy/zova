import { BeanControllerPageBase, Local, zz } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageLocale extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  protected async __init__() {}
}
