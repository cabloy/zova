import { BeanBase, Store } from 'zova';
import { ScopeModule } from '../resource/this.js';

export interface User {
  username?: string;
  avatar?: string;
}

export interface UserInfoData {
  user?: User;
}

@Store()
export class StoreUserInfo extends BeanBase<ScopeModule> {
  protected async __init__() {}

  protected __dispose__() {}
}
