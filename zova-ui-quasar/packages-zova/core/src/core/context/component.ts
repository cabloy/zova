import { BeanRenderBase } from '../../bean/beanRenderBase.js';
import { BeanSimple } from '../../bean/beanSimple.js';
import { BeanRenderIdentifier } from '../../bean/type.js';
import { Cast } from '../../types/utils/cast.js';

export class CtxComponent extends BeanSimple {
  private _bean_render_original: any;

  activate() {
    const renderMethod = process.env.SERVER ? 'ssrRender' : 'render';
    const self = this;
    const instance = Cast(this.ctx.instance);
    this._bean_render_original = instance[renderMethod];
    instance[renderMethod] = function (this, ...args) {
      if (instance.isUnmounted) return;
      if (!self.ctx.meta.state.inited.state) {
        return self._bean_render_original.call(this, ...args);
      }
      const render: BeanRenderBase = self.ctx.bean._getBeanSyncOnly(BeanRenderIdentifier);
      if (!render) {
        return self._bean_render_original.call(this, ...args);
        // throw new Error('render bean not found');
      }
      // need not use ctx.meta.util.instanceScope, since ctx.instance = getCurrentInstance()
      return render.render();
    };
  }

  /** @internal */
  public dispose() {
    const renderMethod = process.env.SERVER ? 'ssrRender' : 'render';
    const instance = Cast(this.ctx.instance);
    instance[renderMethod] = this._bean_render_original;
    this._bean_render_original = null;
  }
}
