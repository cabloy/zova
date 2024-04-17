import { setCurrentInstance } from '@cabloy/vue-runtime-core';
import { pauseTracking, resetTracking } from '@vue/reactivity';
import { BeanSimple } from '../../bean/beanSimple.js';

export class CtxUtil extends BeanSimple {
  instanceScope(fn, tracking?: boolean) {
    const reset = setCurrentInstance(this.ctx.instance);
    if (!tracking) {
      pauseTracking();
    }
    const result = fn();
    if (!tracking) {
      resetTracking();
    }
    reset();
    return result;
  }
}
