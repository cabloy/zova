import { Cast } from '../types/utils/cast.js';
import { BeanBase } from './beanBase.js';
import { BeanControllerIdentifier } from './type.js';

const SymbolController = Symbol('SymbolController');

export class BeanControllerLike<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  private get [SymbolController](): unknown | undefined {
    return this.bean._getBeanSyncOnly(BeanControllerIdentifier);
  }

  protected __get__(prop) {
    const controller = Cast(this[SymbolController]);
    return controller?.[prop];
  }

  protected __set__(prop, value) {
    const controller = Cast(this[SymbolController]);
    if (controller) {
      controller[prop] = value;
    }
  }
}
