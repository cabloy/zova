import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeApplyParams, ThemeApplyResult, ThemeBase } from 'zova-module-a-style';
import { ThemeToken } from 'zova-module-a-element';
import { themeDark } from './themeDark.js';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements ThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const token: ThemeToken = dark ? themeDark : themeDark;
    const body = window?.document?.documentElement;
    if (body) {
      for (const key in token) {
        const key2 = `--el-${key}`;
        body.style.setProperty(key2, token[key]);
      }
      if (dark) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    }
    return { token };
  }
}
