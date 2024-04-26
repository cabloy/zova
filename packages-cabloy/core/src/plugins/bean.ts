import { App } from 'vue';
import { CabloyContext } from '../core/index.js';
import { BeanRenderBase } from '../bean/beanRenderBase.js';

export const PluginBean = {
  install(app: App) {
    app.mixin({
      created() {
        const self = this;
        // self._ is instance, not use self.$
        const ctx: CabloyContext = self._.cabloy;
        if (!ctx) return;
        self.__bean_render_original = self._.render;
        self._.render = function (this, ...args) {
          if (!ctx.meta.state.inited.state) {
            return self.__bean_render_original.call(this, ...args);
          }
          const render: BeanRenderBase = ctx.bean._getBeanSyncOnly('$$render');
          if (!render) {
            throw new Error('render bean not found');
          }
          // need not use ctx.meta.util.instanceScope, since ctx.instance = getCurrentInstance()
          return render.render();
        };
      },
    });
  },
};
