import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  async apply({ token: _token }: ThemeHandlerApplyParams): Promise<void> {
    // do nothing
  }
}
