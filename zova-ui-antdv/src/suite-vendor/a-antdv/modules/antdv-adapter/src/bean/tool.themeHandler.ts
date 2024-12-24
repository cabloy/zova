import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { IThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements IThemeHandler {
  async apply({ token: _token }: ThemeHandlerApplyParams): Promise<void> {
    // do nothing
  }
}
