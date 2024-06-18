import { BeanBase, Store } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Store()
export class StoreUserInfo extends BeanBase<ScopeModule> {
  protected async __init__() {}

  protected __dispose__() {}
}
