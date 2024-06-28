import { BeanBase, Cast } from 'zova';
import { BeanDataBase } from '../virtual.data.js';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';

export class BeanDataLast<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  get self() {
    return Cast<BeanDataBase>(this);
  }

  get scopeSelf(): ScopeModule {
    return this.getScope(__ThisModule__);
  }
}
