import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import { ThemeToken } from 'zova-module-home-base';
import { themeDark } from './themeDark.js';
import { themeLight } from './themeLight.js';

@Theme()
export class ThemeOrange extends BeanBase<ScopeModule> implements IThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<IThemeApplyResult> {
    const token: ThemeToken = dark ? themeDark : themeLight;
    return { token };
  }
}
