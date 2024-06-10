import { appResource } from '../core/resource.js';
import { StateLock } from '../utils/stateLock.js';
import { BeanSimple } from './beanSimple.js';

export const SymbolBeanFullName = Symbol('SymbolBeanFullName');
export const SymbolModuleBelongInner = Symbol('SymbolModuleBelongInner');
export const SymbolModuleBelong = Symbol('SymbolModuleBelong');
export const SymbolInited = Symbol('SymbolInited');

export class BeanBaseSimple extends BeanSimple {
  private [SymbolBeanFullName]: string;
  private [SymbolModuleBelongInner]?: string;
  // @ts-ignore: ignore
  private [SymbolInited]: StateLock;

  constructor(moduleBelong?: string) {
    super();
    if (moduleBelong && typeof moduleBelong !== 'string') {
      throw new Error(`moduleBelong not valid: ${moduleBelong}`);
    }
    this[SymbolModuleBelongInner] = moduleBelong;
    this[SymbolInited] = StateLock.create();
  }

  protected get moduleBelong() {
    return this[SymbolModuleBelongInner] || appResource._getModuleBelong(this[SymbolBeanFullName]);
  }
}
