import { BeanSimple } from '../../bean/beanSimple.js';
import { StateLock } from '../../utils/stateLock.js';

export class CtxState extends BeanSimple {
  private _inited: StateLock;
  private _mounted: StateLock;

  protected __init__() {
    this._inited = StateLock.create();
    this._mounted = StateLock.create();
  }

  get inited() {
    return this._inited;
  }

  get mounted() {
    return this._mounted;
  }
}
