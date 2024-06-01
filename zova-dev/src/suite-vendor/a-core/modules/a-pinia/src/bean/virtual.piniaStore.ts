import { BeanBase, Virtual } from 'zova';

const SymbolPiniaStore = Symbol('SymbolPiniaStore');

@Virtual()
export class BeanPiniaStoreBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  [SymbolPiniaStore];

  protected __get__(prop) {
    return this[SymbolPiniaStore][prop];
  }

  protected __set__(prop, value) {
    this[SymbolPiniaStore][prop] = value;
  }

  protected async __init__(useStore) {
    this[SymbolPiniaStore] = useStore();
  }
}
