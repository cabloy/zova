import { BeanControllerPageBase, Local, getBeanName, zz } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageStyle extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  active: boolean;
  themeDarkOptions = [
    { label: 'Light', value: false },
    { label: 'Dark', value: true },
    { label: 'Auto', value: 'auto' },
  ];
  themeNameOptions = [
    {
      label: 'Default',
      value: getBeanName('home-theme.theme.default'),
    },
    { label: 'Orange', value: getBeanName('a-demo.theme.orange') },
  ];

  protected async __init__() {}

  protected __dispose__() {}
}
