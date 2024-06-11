import { BeanBase, IBeanRecord, Store } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeBase } from '../types.js';

export type ThemeDarkMode = 'auto' | boolean;

@Store()
export class StoreTheme extends BeanBase<ScopeModule> {
  name: string;
  dark: boolean;
  darkMode: ThemeDarkMode; // auto/true/false
  private _mediaDark?: MediaQueryList;
  private _onMediaDarkChange?;

  protected async __init__() {
    this._setDark('auto');
    this._setTheme();
    this.applyTheme();
  }

  protected __dispose__() {
    this._listenMediaDarkChange(false);
  }

  async applyTheme() {
    const theme = (await this.bean._getBean(this.name, true)) as ThemeBase;
    const res = await theme.apply({ name: this.name, dark: this.dark });
    console.log(res);
  }

  setTheme(name?: keyof IBeanRecord) {
    this._setTheme(name);
  }

  _setTheme(name?: keyof IBeanRecord) {
    this.name = name || this.scope.config.defaultTheme;
  }

  setDark(mode: ThemeDarkMode) {
    this._setDark(mode);
  }

  _setDark(mode: ThemeDarkMode) {
    this.darkMode = mode;
    if (mode === 'auto') {
      this._listenMediaDarkChange(true);
      this.dark = !!this._mediaDark?.matches;
    } else {
      this._listenMediaDarkChange(false);
      this.dark = mode;
    }
  }

  toggleDark() {
    this.setDark(!this.dark);
  }

  _listenMediaDarkChange(listen: boolean) {
    if (listen) {
      if (!this._mediaDark) {
        this._mediaDark = window.matchMedia('(prefers-color-scheme: dark)');
        this._onMediaDarkChange = () => {
          this.setDark('auto');
        };
        this._mediaDark.addEventListener('change', this._onMediaDarkChange);
      }
    } else {
      if (this._mediaDark) {
        this._mediaDark.removeEventListener('change', this._onMediaDarkChange);
        this._onMediaDarkChange = undefined;
        this._mediaDark = undefined;
      }
    }
  }
}
