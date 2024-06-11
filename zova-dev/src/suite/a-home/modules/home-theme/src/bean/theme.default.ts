import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeApplyParams, ThemeApplyResult } from 'zova-module-a-style';
import { ThemeToken } from 'zova-module-a-devui';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> {
  async apply({ name: _name, dark: _dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const token: ThemeToken = {
      color: {
        primary: '#00b96b',
      },
      var: {
        borderColor: '#aaa',
      },
    };
    return { token };
  }
}
