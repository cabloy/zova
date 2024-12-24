import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { IThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import { ThemeToken } from '../themeToken.js';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements IThemeBase {
  async apply({ name: _name, dark: _dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    const token: ThemeToken = {};
    return { token };
  }
}
