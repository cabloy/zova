import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelUserInfo } from '../../bean/model.userInfo.js';
import { ServiceUserLoginParams } from '../../api/index.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageLogin extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use()
  $$modelUserInfo: ModelUserInfo;

  user: ServiceUserLoginParams = {
    username: 'admin',
    password: '',
  };

  async login() {
    await this.$$modelUserInfo.login.mutateAsync(this.user);
  }
}
