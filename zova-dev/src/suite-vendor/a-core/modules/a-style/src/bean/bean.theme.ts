import { Bean, Cast, IBeanRecord } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { ThemeBase, ThemeHandler } from '../types.js';
import { BeanModelBase } from 'zova-module-a-model';
import { watch } from 'vue';

export type ThemeDarkMode = 'auto' | boolean;

@Bean({ containerScope: 'app' })
export class BeanTheme extends BeanModelBase<ScopeModule> {
  name: keyof IBeanRecord;
  darkMode: ThemeDarkMode; // auto/true/false

  private _dark: boolean;
  get dark() {
    return this._dark;
  }

  token: unknown;
  private _mediaDark?: MediaQueryList;
  private _onMediaDarkChange?;

  protected async __init__() {
    this.name = this.$useQueryCookie({
      queryKey: ['themename'],
      meta: {
        defaultData: this.scope.config.defaultTheme,
      },
    });
    this.darkMode = this.$useQueryCookie({
      queryKey: ['themedarkmode'],
      meta: {
        persister: {
          deserialize: value => {
            value = value === 'true' ? true : value === 'false' ? false : !value ? undefined : value;
            return this.$deserializeCookie(value);
          },
        },
        defaultData: 'auto',
      },
    });
    this._dark = this.$useQueryCookie({
      queryKey: ['themedark'],
      meta: {
        persister: {
          deserialize: value => {
            value = value === 'true' ? true : value === 'false' ? false : !value ? undefined : value;
            return this.$deserializeCookie(value);
          },
        },
        defaultData: () => {
          return this._getDarkFromDarkMode(this.darkMode);
        },
      },
    });

    watch(
      () => this.darkMode,
      () => {
        this._dark = this._getDarkFromDarkMode(this.darkMode);
      },
    );

    watch([() => this.name, () => this._dark], () => {
      this._applyTheme();
    });
    // not use watch.immediate for await done
    await this._applyTheme();
  }

  protected __dispose__() {
    this._listenMediaDarkChange(false);
  }

  async _applyTheme() {
    const name = this.name;
    const dark = this._dark;
    const theme = (await this.bean._getBean(name as any, true)) as ThemeBase;
    const res = await theme.apply({ name, dark });
    this.token = Cast(res).token;
    const handler = res.handler ?? this.scope.config.defaultThemeHandler;
    if (handler) {
      const themeHandler = (await this.bean._getBean(handler, true)) as unknown as ThemeHandler;
      await themeHandler.apply({ name, dark, token: this.token } as any);
    }
  }

  toggleDark() {
    this.darkMode = !this._dark;
  }

  _getDarkFromDarkMode(mode?: ThemeDarkMode) {
    if (mode === undefined) mode = 'auto';
    if (mode === 'auto') {
      this._listenMediaDarkChange(true);
      return !!this._mediaDark?.matches;
    } else {
      this._listenMediaDarkChange(false);
      return mode;
    }
  }

  _listenMediaDarkChange(listen: boolean) {
    if (listen) {
      if (!this._mediaDark) {
        this._mediaDark = window.matchMedia('(prefers-color-scheme: dark)');
        this._onMediaDarkChange = async () => {
          this._applyTheme();
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
