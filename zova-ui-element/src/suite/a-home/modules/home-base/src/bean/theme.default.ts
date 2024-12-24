import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { IThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import { ThemeToken } from '../themeToken.js';
import { themeDark } from './theme/themeDark.js';
import { themeLight } from './theme/themeLight.js';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements IThemeBase {
  async apply({ name: _name, dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    const token: ThemeToken = dark ? themeDark : themeLight;
    return { token };
  }
}
