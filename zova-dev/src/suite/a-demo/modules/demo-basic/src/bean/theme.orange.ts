import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeApplyParams, ThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import { ThemeToken } from 'zova-module-home-base';

@Theme()
export class ThemeOrange extends BeanBase<ScopeModule> implements IThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const token: ThemeToken = {
      color: {
        primary: '#f28238',
      },
      var: {
        borderColor: '#f28d49',
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
