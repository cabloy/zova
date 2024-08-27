import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalSSR extends BeanBase<ScopeModule> {
  public async initialize() {
    // ssr style
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {});
    }
  }
}
