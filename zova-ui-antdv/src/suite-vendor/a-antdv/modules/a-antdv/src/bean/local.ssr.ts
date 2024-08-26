import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { createCache, extractStyle } from 'ant-design-vue';

@Local()
export class LocalSSR extends BeanBase<ScopeModule> {
  styleCache: ReturnType<typeof createCache>;

  public async initialize() {
    // ssr style
    this.styleCache = createCache();
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        const styles = extractStyle(this.styleCache);
        this.ctx.meta.ssr.context._meta.endingHeadTags += styles;
      });
    }
  }
}
