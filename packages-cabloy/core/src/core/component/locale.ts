import * as localeutil from '@cabloy/localeutil';
import { BeanSimple } from '../../bean/beanSimple.js';
import { TypeModuleResourceLocales } from '../../types/interface/module.js';
import { IModuleLocale, IModuleLocaleText } from '../../bean/resource/locale/type.js';

const SymbolLocale = Symbol('SymbolLocale');

export class AppLocale extends BeanSimple {
  private [SymbolLocale]: string;
  /** @internal */
  public locales: TypeModuleResourceLocales;

  get locale() {
    return this[SymbolLocale];
  }

  set locale(value) {
    this[SymbolLocale] = value;
  }

  /** @internal */
  public async initialize(locales: TypeModuleResourceLocales) {
    this.locales = locales;
  }

  /** @internal */
  public createLocaleText(): IModuleLocaleText {
    const self = this;
    const getText = function (text: string, ...args: any[]): string {
      return self._getText(self.locale, text, ...args);
    };
    getText.locale = function (locale: string | undefined | null, text: string, ...args: any[]): string {
      return self._getText(locale || self.locale, text, ...args);
    };
    return getText;
  }

  /** @internal */
  public createScopeLocaleText(text: string): IModuleLocale {
    const self = this;
    const getText = function (...args: any[]): string {
      return self._getText(self.locale, text, ...args);
    };
    getText.locale = function (locale: string | undefined | null, ...args: any[]): string {
      return self._getText(locale || self.locale, text, ...args);
    };
    return getText;
  }

  private _getText(locale: string, key: string, ...args: any[]): string {
    return localeutil.getLocaleText(this.locales, locale, key, ...args);
  }
}
