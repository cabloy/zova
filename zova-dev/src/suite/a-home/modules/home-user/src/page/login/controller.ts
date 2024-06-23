import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { DataUserInfo, UserInfoData } from '../../bean/data.userInfo.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Local()
export class ControllerPageLogin extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  @Use()
  $$userInfo: DataUserInfo;

  user = {
    username: 'admin',
    password: '',
  };

  async login() {
    // api
    const data = await this.$api.post<any, UserInfoData>('/home/user/login', this.user);
    // save
    this.$$userInfo.setUserInfo(data);
    // home
    this.$router.replace('/');
  }
}
