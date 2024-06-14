import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeApplyParams, ThemeApplyResult, ThemeBase } from 'zova-module-a-style';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements ThemeBase {
  async apply({ name: _name, dark: _dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    return {};
  }
}
