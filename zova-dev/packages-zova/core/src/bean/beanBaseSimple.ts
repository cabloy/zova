import { appResource } from '../core/resource.js';
import { StateLock } from '../utils/stateLock.js';
import { BeanSimple } from './beanSimple.js';

export const SymbolBeanFullName = Symbol('SymbolBeanFullName');

export class BeanBaseSimple extends BeanSimple {
  private [SymbolBeanFullName]: string;
  private __moduleBelong__?: string;
  // @ts-ignore: ignore
  private __inited__: StateLock;

  constructor(moduleBelong?: string) {
    super();
    if (moduleBelong && typeof moduleBelong !== 'string') {
      throw new Error(`moduleBelong not valid: ${moduleBelong}`);
    }
    this.__moduleBelong__ = moduleBelong;
    this.__inited__ = StateLock.create();
  }

  protected get moduleBelong() {
    return this.__moduleBelong__ || appResource._getModuleBelong(this[SymbolBeanFullName]);
  }
}
