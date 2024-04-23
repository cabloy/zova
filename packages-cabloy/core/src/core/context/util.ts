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

  defineProperty<T>(obj: T, prop: string, attributes: PropertyDescriptor & ThisType<any>): T {
    const self = this;
    const attrs = { ...attributes };
    if (attributes.get) {
      attrs.get = function () {
        const innerKey = `__innerKey_${prop}`;
        if (!obj[innerKey]) {
          self.instanceScope(() => {
            obj[innerKey] = attributes.get!();
          });
        }
        return obj[innerKey];
      };
    }
    return Object.defineProperty(obj, prop, attrs);
  }
}
