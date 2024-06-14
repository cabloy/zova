import { BeanBase, Cast, Tool } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  async apply({ name, token }: ThemeHandlerApplyParams): Promise<void> {
    // theme
    Cast(this.$vuetify.theme.global).name = name;
    Cast(this.$vuetify.theme.themes)[name] = token;
  }
}
