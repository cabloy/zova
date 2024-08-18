import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';
import { setCssVar } from 'quasar';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  async apply({ dark, token }: ThemeHandlerApplyParams): Promise<void> {
    if (process.env.CLIENT) {
      for (const key in token.color) {
        setCssVar(key, token.color[key]);
      }
      // dark
      this.$q.dark.set(dark);
    }
    if (process.env.SERVER) {
      const bodyStyle = {};
      for (const key in token.color) {
        bodyStyle[`--q-${key}`] = token.color[key];
      }
      this.$useMeta({ bodyStyle });
    }
  }
}
