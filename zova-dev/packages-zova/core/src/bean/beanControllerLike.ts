import { Cast } from '../types/utils/cast.js';
import { BeanBase } from './beanBase.js';
import { BeanControllerIdentifier } from './type.js';

const SymbolController = Symbol('SymbolController');

export class BeanControllerLike<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  protected get [SymbolController](): unknown {
    return this.bean._getBeanSyncOnly(BeanControllerIdentifier);
  }

  protected __get__(prop) {
    const controller = Cast(this[SymbolController]);
    return controller[prop];
  }

  protected __set__(prop, value) {
    const controller = Cast(this[SymbolController]);
    if (prop in controller) {
      controller[prop] = value;
      return true;
    } else {
      return false;
    }
  }
}
