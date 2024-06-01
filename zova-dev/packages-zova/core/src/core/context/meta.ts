import { RendererNode } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { CtxState } from './state.js';
import { CtxUtil } from './util.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;
  state: CtxState;

  get el(): RendererNode {
    return this.ctx.instance.vnode.el!;
  }

  protected __init__() {
    this.util = this.bean._newBeanSimple(CtxUtil, false);
    this.state = this.bean._newBeanSimple(CtxState, true);
  }
}
