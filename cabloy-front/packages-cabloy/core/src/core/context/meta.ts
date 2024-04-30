import { BeanSimple } from '../../bean/beanSimple.js';
import { CtxState } from './state.js';
import { CtxUtil } from './util.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;
  state: CtxState;

  protected __init__() {
    this.util = this.bean._newBeanSimple(CtxUtil, false);
    this.state = this.bean._newBeanSimple(CtxState, true);
  }
}
