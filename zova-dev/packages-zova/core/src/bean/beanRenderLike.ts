import { Cast } from '../types/utils/cast.js';
import { BeanControllerLike } from './beanControllerLike.js';
import { BeanStyleIdentifier } from './type.js';

const SymbolStyle = Symbol('SymbolStyle');

export class BeanRenderLike<TScopeModule = unknown> extends BeanControllerLike<TScopeModule> {
  private get [SymbolStyle](): unknown {
    return this.bean._getBeanSyncOnly(BeanStyleIdentifier);
  }

  /** @internal */
  public __get__(prop): unknown {
    const value = super.__get__(prop);
    if (value !== undefined) return value;
    const style = Cast(this[SymbolStyle]);
    return style[prop];
  }

  /** @internal */
  public __set__(prop, value): boolean {
    const res = super.__set__(prop, value);
    if (res) return res;
    const style = Cast(this[SymbolStyle]);
    if (prop in style) {
      style[prop] = value;
      return true;
    } else {
      return false;
    }
  }
}
