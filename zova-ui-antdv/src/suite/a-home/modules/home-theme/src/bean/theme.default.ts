import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeApplyParams, ThemeApplyResult, ThemeBase } from 'zova-module-a-style';
import { ThemeToken } from 'zova-module-a-antdv';
import { theme } from 'ant-design-vue';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements ThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const seed = Object.assign({}, theme.defaultSeed, {
      colorBgBase: dark ? '#000' : '#FFF',
      colorTextBase: dark ? '#FFF' : '#000',
    } as ThemeToken);
    const token: ThemeToken = theme.defaultAlgorithm(seed);
    return { token };
  }
}
