import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';

const __Themes = { 'demo-basic.theme.orange': 'orange', 'home-base.theme.default': '' };

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  async apply({ name, dark, token: _token }: ThemeHandlerApplyParams): Promise<void> {
    // themeName
    const _names: string[] = [];
    const _name = __Themes[name];
    if (_name) _names.push(_name);
    _names.push(dark ? 'dark' : 'light');
    const themeName = _names.join('-');
    // data-theme
    if (process.env.CLIENT) {
      // client
      const body = window?.document?.body;
      if (body) {
        body.setAttribute('data-theme', themeName);
      }
    } else {
      // server
      if (!this.app.config.ssr.cookieThemeDark) {
        this.$useMeta({ bodyAttr: { [`data-ssr-theme-dark-${dark}`]: themeName } });
      } else {
        this.$useMeta({ bodyAttr: { 'data-theme': themeName } });
      }
    }
  }
}
