import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ID_INJECTION_KEY } from 'element-plus';

@Local()
export class LocalSSR extends BeanBase<ScopeModule> {
  public async initialize() {
    // provide id
    if (process.env.SSR) {
      this.app.vue.provide(ID_INJECTION_KEY, {
        prefix: 1024,
        current: 0,
      });
    }
    // ssr style
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {});
    }
  }
}
