import { Cast } from '../types/utils/cast.js';
import { BeanBase } from './beanBase.js';

const SymbolController = Symbol('SymbolController');

export class BeanRenderBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  private get [SymbolController]() {
    return this.bean._getBeanSyncOnly('$$controller');
  }

  render() {
    return;
  }

  protected __get__(prop) {
    return Cast(this[SymbolController])[prop];
  }

  protected __set__(prop, value) {
    Cast(this[SymbolController])[prop] = value;
  }
}
