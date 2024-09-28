import { BeanBase, Tool, Use } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';
import { ModelTheme } from './model.theme.js';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  @Use()
  $$modelTheme: ModelTheme;

  async apply({ dark, token }: ThemeHandlerApplyParams): Promise<void> {
    // data
    const brand = {};
    for (const key in token.color) {
      brand[`--q-${key}`] = token.color[key];
    }
    const cBrandOld = this.$$modelTheme.cBrand;
    this.$$modelTheme.cBrand = this.$style({
      $nest: {
        '&&': brand,
      },
    });
    // client
    if (process.env.CLIENT) {
      // body
      const body = window.document.body;
      // cBrand
      if (cBrandOld) {
        body.classList.remove(cBrandOld);
      }
      body.classList.add(this.$$modelTheme.cBrand);
      // dark
      this.$q.dark.set(dark);
    }
    // server
    if (process.env.SERVER) {
      if (!this.app.config.ssr.cookieThemeDark) {
        const bodyClass = [this.$$modelTheme.cBrand, dark ? 'body--dark' : 'body--light'];
        this.$useMeta({ bodyAttr: { [`data-ssr-theme-dark-${dark}`]: bodyClass.join(',') } });
      } else {
        // dark
        const bodyClass = {
          [this.$$modelTheme.cBrand]: true,
          'body--light': !dark,
          'body--dark': dark,
        };
        // meta
        this.$useMeta({ bodyClass });
      }
    }
  }
}
