import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelAuth } from '../../bean/model.auth.js';
import { ServiceAuthLoginParams } from '../../api/interface/auth.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageLogin extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use()
  $$modelAuth: ModelAuth;

  user: ServiceAuthLoginParams = {
    username: 'admin',
    password: '',
  };

  async login() {
    await this.$$modelAuth.login().mutateAsync(this.user);
  }
}
