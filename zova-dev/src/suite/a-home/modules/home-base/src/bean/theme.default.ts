import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeApplyParams, ThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import { ThemeToken } from '../themeToken.js';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements IThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const token: ThemeToken = {
      color: {
        primary: '#1976d2',
      },
      var: {
        borderColor: '#297acc',
      },
      component: {
        page: {
          background: dark ? '#121212' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      },
    };
    return { token };
  }
}
