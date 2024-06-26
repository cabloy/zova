import { App } from 'vue';
import { ZovaContext } from '../core/index.js';

export const PluginBean = {
  install(app: App) {
    app.mixin({
      created() {
        // this._ is instance, not use self.$
        const ctx: ZovaContext = this._.zova;
        if (ctx) {
          ctx.meta.component.activate();
        }
      },
    });
  },
};
