import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements IThemeHandler {
  async apply({ token: _token }: IThemeHandlerApplyParams): Promise<void> {
    // do nothing
  }
}
