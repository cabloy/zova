import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';

const __Themes = { 'a-demo.theme.orange': 'orange', 'home-theme.theme.default': '' };

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
      const body = window?.document?.documentElement;
      if (body) {
        body.setAttribute('data-theme', themeName);
      }
    } else {
      // meta
      this.$useMeta({ bodyAttr: { 'data-theme': themeName } });
    }
  }
}
