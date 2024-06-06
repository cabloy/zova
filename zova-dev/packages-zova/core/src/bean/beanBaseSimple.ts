import { appResource } from '../core/resource.js';
import { StateLock } from '../utils/stateLock.js';
import { BeanSimple } from './beanSimple.js';

export const SymbolBeanFullName = Symbol('SymbolBeanFullName');
export const SymbolModuleBelong = Symbol('SymbolModuleBelong');

export class BeanBaseSimple extends BeanSimple {
  private [SymbolBeanFullName]: string;
  private [SymbolModuleBelong]?: string;
  // @ts-ignore: ignore
  private __inited__: StateLock;

  constructor(moduleBelong?: string) {
    super();
    if (moduleBelong && typeof moduleBelong !== 'string') {
      throw new Error(`moduleBelong not valid: ${moduleBelong}`);
    }
    this[SymbolModuleBelong] = moduleBelong;
    this.__inited__ = StateLock.create();
  }

  protected get moduleBelong() {
    return this[SymbolModuleBelong] || appResource._getModuleBelong(this[SymbolBeanFullName]);
  }
}
