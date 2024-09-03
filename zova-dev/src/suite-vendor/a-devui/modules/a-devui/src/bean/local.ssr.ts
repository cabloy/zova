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
        if (!this.app.config.ssr.cookieThemeDark) {
          this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            document.body.setAttribute('data-theme', window.ssr_themedark_data);
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        }
      });
    }
  }
}
