import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { StoreUserInfo } from '../../bean/store.userInfo.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageLogin extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use()
  $$userInfo: StoreUserInfo;

  user = {
    username: '',
    password: '',
  };

  async login() {
    // api
    const res = await this.$api.post('/home/user/login', this.user);
    const data = res.data.data;
    // save
    this.$$userInfo.setUserInfo(data);
    // home
    this.$router.replace('/');
  }
}
