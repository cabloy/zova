import { appResource } from '../core/resource.js';
import { StateLock } from '../utils/stateLock.js';
import { BeanSimple } from './beanSimple.js';

export const SymbolBeanFullName = Symbol('SymbolBeanFullName');
export const SymbolModuleBelong = Symbol('SymbolModuleBelong');
export const SymbolInited = Symbol('SymbolInited');

export class BeanBaseSimple extends BeanSimple {
  private [SymbolBeanFullName]: string;
  private [SymbolModuleBelong]?: string;
  // @ts-ignore: ignore
  private [SymbolInited]: StateLock;

  constructor(moduleBelong?: string) {
    super();
    if (moduleBelong && typeof moduleBelong !== 'string') {
      throw new Error(`moduleBelong not valid: ${moduleBelong}`);
    }
    this[SymbolModuleBelong] = moduleBelong;
    this[SymbolInited] = StateLock.create();
  }

  protected get moduleBelong() {
    return this[SymbolModuleBelong] || appResource._getModuleBelong(this[SymbolBeanFullName]);
  }
}
