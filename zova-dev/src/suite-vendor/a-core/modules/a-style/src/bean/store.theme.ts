import { BeanBase, Store } from 'zova';
import { ScopeModule } from '../resource/this.js';

export type ThemeDarkMode = 'auto' | boolean;
@Store()
export class StoreTheme extends BeanBase<ScopeModule> {
  dark: boolean;
  darkMode: ThemeDarkMode; // auto/true/false
  private _mediaDark;

  protected async __init__() {
    this.setDark('auto');
  }

  protected __dispose__() {}

  setDark(mode: ThemeDarkMode) {
    this.darkMode = mode;
    if (mode === 'auto') {
    }
  }

  _listenMediaDarkChange(listen: boolean) {}
}
