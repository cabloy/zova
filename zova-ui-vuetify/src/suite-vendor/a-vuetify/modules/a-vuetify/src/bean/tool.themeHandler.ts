import { BeanBase, Cast, Tool } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  async apply({ name, dark, token }: ThemeHandlerApplyParams): Promise<void> {
    // theme
    Cast(this.$vuetify.theme.global).name = name;
    Cast(this.$vuetify.theme.themes)[name] = token;
    if (process.env.SERVER) {
      // no matter that cookie or not
      this.$ssr.state[`data-ssr-theme-dark-${dark}`] = this.$vuetify.theme.styles;
      this.$ssr.state['data-ssr-theme-name'] = name;
      this.$ssr.state[`data-ssr-theme-token-${dark}`] = token;
    }
  }
}
