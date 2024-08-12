import { BeanSimple } from '../../bean/beanSimple.js';
import { StateLock } from '../../utils/stateLock.js';

let __id: number = 0;

export class CtxState extends BeanSimple {
  private _id: number;
  private _inited: StateLock;
  private _mounted: StateLock;

  protected __init__() {
    this._id = ++__id;
    this._inited = StateLock.create();
    this._mounted = StateLock.create();
  }

  get id() {
    return this._id;
  }

  get inited() {
    return this._inited;
  }

  get mounted() {
    return this._mounted;
  }
}
