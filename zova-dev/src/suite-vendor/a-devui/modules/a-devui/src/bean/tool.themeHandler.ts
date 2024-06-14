import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeApplyResult, ThemeHandler } from 'zova-module-a-style';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  async apply({ token: _token }: ThemeApplyResult): Promise<void> {
    // do nothing
  }
}
