import { BeanBase, Store } from 'zova';
import { ScopeModule } from '../resource/this.js';

export type ThemeDarkMode = 'auto' | boolean;

@Store()
export class StoreTheme extends BeanBase<ScopeModule> {
  dark: boolean;
  darkMode: ThemeDarkMode; // auto/true/false
  private _mediaDark?: MediaQueryList;
  private _onMediaDarkChange?;

  protected async __init__() {
    this.setDark('auto');
  }

  protected __dispose__() {
    this._listenMediaDarkChange(false);
  }

  setDark(mode: ThemeDarkMode) {
    this.darkMode = mode;
    if (mode === 'auto') {
      this._listenMediaDarkChange(true);
      this.dark = !!this._mediaDark?.matches;
    } else {
      this._listenMediaDarkChange(false);
      this.dark = mode;
    }
  }

  toggle() {
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
