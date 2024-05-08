import * as localeutil from '@cabloy/localeutil';
import { BeanSimple } from '../../bean/beanSimple.js';
import { TypeModuleResourceLocaleModules, TypeModuleResourceLocales } from '../../types/interface/module.js';
import { IModuleLocale, IModuleLocaleText } from '../../bean/resource/locale/type.js';

const SymbolLocale = Symbol('SymbolLocale');

export class AppLocale extends BeanSimple {
  private [SymbolLocale]: string;
  /** @internal */
  public locales: TypeModuleResourceLocales;
  public localeModules: TypeModuleResourceLocaleModules;

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
      return self._getText(undefined, self.locale, text, ...args);
    };
    getText.locale = function (locale: string | undefined | null, text: string, ...args: any[]): string {
      return self._getText(undefined, locale || self.locale, text, ...args);
    };
    return getText;
  }

  /** @internal */
  public createScopeLocaleText(moduleScope: string, text: string): IModuleLocale {
    const self = this;
    const getText = function (...args: any[]): string {
      return self._getText(moduleScope, self.locale, text, ...args);
    };
    getText.locale = function (locale: string | undefined | null, ...args: any[]): string {
      return self._getText(moduleScope, locale || self.locale, text, ...args);
    };
    return getText;
  }

  private _getText(moduleScope: string | undefined, locale: string, key: string, ...args: any[]): string {
    return localeutil.getLocaleText(
      moduleScope ? this.localeModules[moduleScope] : undefined,
      this.locales,
      locale,
      key,
      ...args,
    );
  }
}
