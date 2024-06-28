import { BeanBase, Cast } from 'zova';
import { BeanModelBase } from '../virtual.model.js';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';

export class BeanDataLast<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  get self() {
    return Cast<BeanModelBase>(this);
  }

  get scopeSelf(): ScopeModule {
    return this.getScope(__ThisModule__);
  }
}
