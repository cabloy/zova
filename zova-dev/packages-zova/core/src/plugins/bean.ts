import { App } from 'vue';
import { ZovaContext } from '../core/index.js';
import { BeanRenderBase } from '../bean/beanRenderBase.js';
import { BeanRenderIdentifier } from '../bean/type.js';

export const PluginBean = {
  install(app: App) {
    app.mixin({
      created() {
        const self = this;
        // self._ is instance, not use self.$
        const ctx: ZovaContext = self._.zova;
        if (!ctx) return;
        self.__bean_render_original = self._.render;
        self._.render = function (this, ...args) {
          if (self._.isUnmounted) return;
          if (!ctx.meta.state.inited.state) {
            return self.__bean_render_original.call(this, ...args);
          }
          const render: BeanRenderBase = ctx.bean._getBeanSyncOnly(BeanRenderIdentifier);
          if (!render) {
            return self.__bean_render_original.call(this, ...args);
            // throw new Error('render bean not found');
          }
          // need not use ctx.meta.util.instanceScope, since ctx.instance = getCurrentInstance()
          return render.render();
        };
      },
    });
  },
};
