import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeApplyResult, ThemeHandler } from 'zova-module-a-style';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  async apply({ token }: ThemeApplyResult): Promise<void> {
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
  }
}
