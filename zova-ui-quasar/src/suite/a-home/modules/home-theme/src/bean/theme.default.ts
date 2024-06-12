import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeApplyParams, ThemeApplyResult, ThemeBase } from 'zova-module-a-style';
import { ThemeToken } from 'zova-module-a-quasar';
import { setCssVar } from 'quasar';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements ThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    // token
    const token: ThemeToken = {
      color: {
        primary: '#1976d2',
        secondary: '#26A69A',
        accent: '#9C27B0',
        dark: '#1d1d1d',
        'dark-page': '#121212',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037',
      },
    };
    for (const key in token.color) {
      setCssVar(key, token.color[key]);
    }
    // dark
    this.$q.dark.set(dark);
    return { token };
  }
}
