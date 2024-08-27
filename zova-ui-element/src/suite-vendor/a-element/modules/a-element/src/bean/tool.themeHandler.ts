import { BeanBase, Tool, Use } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';
import { ModelTheme } from './model.theme.js';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  @Use()
  $$modelTheme: ModelTheme;

  async apply({ dark, token }: ThemeHandlerApplyParams): Promise<void> {
    // body
    const body = process.env.SERVER ? undefined : window?.document?.body;
    // classBrand
    if (this.$$modelTheme.classBrand) {
      body?.classList.remove(this.$$modelTheme.classBrand);
    }
    const brand = {};
    for (const key in token) {
      const key2 = `--el-${key}`;
      brand[key2] = token[key];
      //body.style.setProperty(key2, token[key]);
    }
    this.$$modelTheme.classBrand = this.$style(brand);
    body?.classList.add(this.$$modelTheme.classBrand);
    // dark
    if (dark) {
      body?.classList.add('dark');
    } else {
      body?.classList.remove('dark');
    }
    // server
    if (process.env.SERVER) {
      // meta
      const bodyClass = {
        [this.$$modelTheme.classBrand]: true,
        dark,
      };
      this.$useMeta({ bodyClass });
    }
  }
}
