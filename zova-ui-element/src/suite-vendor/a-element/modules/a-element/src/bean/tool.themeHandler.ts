import { BeanBase, Tool } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeHandler, ThemeHandlerApplyParams } from 'zova-module-a-style';

@Tool()
export class ToolThemeHandler extends BeanBase<ScopeModule> implements ThemeHandler {
  classBrand: string;

  async apply({ dark, token }: ThemeHandlerApplyParams): Promise<void> {
    // body
    const body = process.env.SERVER ? undefined : window?.document?.documentElement;
    // classBrand
    if (this.classBrand) {
      body?.classList.remove(this.classBrand);
    }
    const brand = {};
    for (const key in token) {
      const key2 = `--el-${key}`;
      brand[key2] = token[key];
      //body.style.setProperty(key2, token[key]);
    }
    this.classBrand = this.$style(brand);
    body?.classList.add(this.classBrand);
    // dark
    if (dark) {
      body?.classList.add('dark');
    } else {
      body?.classList.remove('dark');
    }
  }
}
