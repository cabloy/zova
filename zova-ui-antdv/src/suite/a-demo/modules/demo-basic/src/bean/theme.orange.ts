import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeApplyParams, ThemeApplyResult, ThemeBase } from 'zova-module-a-style';
import { theme } from 'ant-design-vue';
import { ThemeToken } from 'zova-module-antdv-adapter';
import { getAlphaColor, getSolidColor } from 'ant-design-vue/es/theme/themes/default/colorAlgorithm.js';

@Theme()
export class ThemeOrange extends BeanBase<ScopeModule> implements ThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const seed = Object.assign({}, theme.defaultSeed, {
      colorBgBase: dark ? '#000' : '#FFF',
      colorTextBase: dark ? '#FFF' : '#000',
      colorPrimary: 'orange',
    } as ThemeToken);
    const token: ThemeToken = theme.defaultAlgorithm(seed);
    if (dark) {
      token.colorBorder = getSolidColor('#FFF', 15);
    } else {
      token.colorBorder = getAlphaColor('#000', 15);
    }
    return { token };
  }
}
