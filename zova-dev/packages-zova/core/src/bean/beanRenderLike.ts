import { Cast } from '../types/utils/cast.js';
import { BeanControllerLike } from './beanControllerLike.js';
import { BeanStyleIdentifier } from './type.js';

const SymbolStyle = Symbol('SymbolStyle');

export class BeanRenderLike<TScopeModule = unknown> extends BeanControllerLike<TScopeModule> {
  private get [SymbolStyle](): unknown {
    return this.bean._getBeanSyncOnly(BeanStyleIdentifier);
  }

  protected __get__(prop) {
    const value = super.__get__(prop);
    if (value !== undefined) return value;
    const style = Cast(this[SymbolStyle]);
    return style[prop];
  }

  protected __set__(prop, value) {
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
