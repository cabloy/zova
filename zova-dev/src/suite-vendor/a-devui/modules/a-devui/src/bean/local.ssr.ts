import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalSSR extends BeanBase<ScopeModule> {
  public async initialize() {
    // ssr hydrated
    if (process.env.CLIENT) {
      this.ctx.meta.ssr.onHydrated(() => {
        // do something
      });
    }
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
    const __Themes = { 'a-demo.theme.orange': 'orange', 'home-theme.theme.default': '' };
    const __names = [];
    const __name = __Themes[window.ssr_local_themename];
    if (__name) __names.push(__name);
    __names.push(window.ssr_local_themedark ? 'dark' : 'light');
    const themeName = __names.join('-');
    document.body.setAttribute('data-theme', themeName);
    document.querySelector('#__prefersColorSchemeDarkJS').remove();
</script>`.replaceAll('\n', '');
      });
    }
  }
}
