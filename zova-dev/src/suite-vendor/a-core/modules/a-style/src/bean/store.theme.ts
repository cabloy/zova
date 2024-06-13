import { BeanBase, Cast, IBeanRecord, Store } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeBase } from '../types.js';

export type ThemeDarkMode = 'auto' | boolean;

@Store()
export class StoreTheme extends BeanBase<ScopeModule> {
  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
    this.applyTheme();
  }
  dark: boolean;
  darkMode: ThemeDarkMode; // auto/true/false
  token: unknown;
  private _mediaDark?: MediaQueryList;
  private _onMediaDarkChange?;

  protected async __init__() {
    await this._setDark('auto');
    await this._setTheme();
    await this.applyTheme();
  }

  protected __dispose__() {
    this._listenMediaDarkChange(false);
  }

  async applyTheme() {
    const theme = (await this.bean._getBean(this.name, true)) as ThemeBase;
    const res = await theme.apply({ name: this.name, dark: this.dark });
    this.token = Cast(res).token;
  }

  async setTheme(name?: keyof IBeanRecord) {
    await this._setTheme(name);
    await this.applyTheme();
  }

  async _setTheme(name?: keyof IBeanRecord) {
    this.name = name || this.scope.config.defaultTheme;
  }

  async setDark(mode: ThemeDarkMode) {
    await this._setDark(mode);
    await this.applyTheme();
  }

  async _setDark(mode: ThemeDarkMode) {
    this.darkMode = mode;
    if (mode === 'auto') {
      this._listenMediaDarkChange(true);
      this.dark = !!this._mediaDark?.matches;
    } else {
      this._listenMediaDarkChange(false);
      this.dark = mode;
    }
  }

  async toggleDark() {
    await this.setDark(!this.dark);
  }

  _listenMediaDarkChange(listen: boolean) {
    if (listen) {
      if (!this._mediaDark) {
        this._mediaDark = window.matchMedia('(prefers-color-scheme: dark)');
        this._onMediaDarkChange = async () => {
          await this.setDark('auto');
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
