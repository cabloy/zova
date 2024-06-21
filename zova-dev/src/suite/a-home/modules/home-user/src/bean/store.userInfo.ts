import { BeanBase, Store } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Store()
export class StoreUserInfo extends BeanBase<ScopeModule> {
  static $storeConfig = {
    user: {
      persist: true,
      query: false,
    },
    jwt: {
      persist: true,
      query: false,
    },
  };

  protected async __init__() {}
}
