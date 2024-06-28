import { Bean, Cast, IBeanRecord } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeBase, ThemeHandler } from '../types.js';
import { BeanModelBase } from 'zova-module-a-model';

export type ThemeDarkMode = 'auto' | boolean;

@Bean({ containerScope: 'app' })
export class BeanTheme extends BeanModelBase<ScopeModule> {
  private _name: keyof IBeanRecord;
  public get name(): keyof IBeanRecord {
    return this._name;
  }
  private _dark: boolean;
  public get dark(): boolean {
    return this._dark;
  }
  private _darkMode: ThemeDarkMode; // auto/true/false
  public get darkMode(): ThemeDarkMode {
    return this._darkMode;
  }
  token: unknown;
  private _mediaDark?: MediaQueryList;
  private _onMediaDarkChange?;

  protected async __init__() {
    this._name = this.$useQueryCookie({
      queryKey: ['themename'],
    });
    this._dark = this.$useQueryCookie({
      queryKey: ['themedark'],
    });
    this._darkMode = this.$useQueryCookie({
      queryKey: ['themedarkmode'],
      meta: {
        persister: {
          deserialize: value => {
            value = value === 'true' ? true : value === 'false' ? false : !value ? undefined : value;
            return this.$deserializeCookie(value);
          },
        },
      },
    });
    await this._setDark(this._darkMode);
    await this._setTheme(this._name);
    await this.applyTheme();
  }

  protected __dispose__() {
    this._listenMediaDarkChange(false);
  }

  async applyTheme() {
    const theme = (await this.bean._getBean(this.name as any, true)) as ThemeBase;
    const res = await theme.apply({ name: this.name, dark: this.dark });
    this.token = Cast(res).token;
    const handler = res.handler ?? this.scope.config.defaultThemeHandler;
    if (handler) {
      const themeHandler = (await this.bean._getBean(handler, true)) as unknown as ThemeHandler;
      await themeHandler.apply({ name: this.name, dark: this.dark, token: this.token } as any);
    }
  }

  async setTheme(name?: keyof IBeanRecord) {
    await this._setTheme(name);
    await this.applyTheme();
  }

  async _setTheme(name?: keyof IBeanRecord) {
    this._name = name || this.scope.config.defaultTheme;
  }

  async setDark(mode: ThemeDarkMode) {
    await this._setDark(mode);
    await this.applyTheme();
  }

  async _setDark(mode?: ThemeDarkMode) {
    if (mode === undefined) mode = 'auto';
    this._darkMode = mode;
    if (mode === 'auto') {
      this._listenMediaDarkChange(true);
      this._dark = !!this._mediaDark?.matches;
    } else {
      this._listenMediaDarkChange(false);
      this._dark = mode;
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
