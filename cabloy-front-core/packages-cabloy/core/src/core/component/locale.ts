import * as localeutil from '@cabloy/localeutil';
import { BeanSimple } from '../../bean/beanSimple.js';
import { TypeModuleResourceLocaleModules, TypeModuleResourceLocales } from '../../types/interface/module.js';
import { IModuleLocale, IModuleLocaleText } from '../../bean/resource/locale/type.js';
import { CabloyLocaleOptionalMap } from '../app/locale.js';

const SymbolLocale = Symbol('SymbolLocale');

export class AppLocale extends BeanSimple {
  private [SymbolLocale]: string;
  /** @internal */
  public locales: TypeModuleResourceLocales = {};
  public localeModules: TypeModuleResourceLocaleModules = {};

  get locale() {
    return this[SymbolLocale];
  }

  set locale(value) {
    this[SymbolLocale] = value;
  }

  /** @internal */
  public async initialize(locales: CabloyLocaleOptionalMap) {
    for (const locale in locales) {
      const moduleMap = locales[locale].modules;
      for (const moduleName in moduleMap) {
        this._registerLocale(moduleName, locale, moduleMap[moduleName]);
      }
    }
  }

  /** @internal */
  public _registerLocales(moduleName: string, locales: TypeModuleResourceLocales) {
    if (!locales) return;
    for (const locale in locales) {
      this._registerLocale(moduleName, locale, locales[locale]);
    }
  }

  private _registerLocale(moduleName: string, locale: string, moduleLocales: object) {
    // locales
    this.locales[locale] = Object.assign({}, moduleLocales, this.locales[locale]);
    // localeModules
    if (!this.localeModules[moduleName]) this.localeModules[moduleName] = {};
    this.localeModules[moduleName][locale] = Object.assign({}, moduleLocales, this.localeModules[moduleName][locale]);
  }

  /** @internal */
  public createLocaleText(): IModuleLocaleText {
    const self = this;
    const getText = function (text: string, ...args: any[]): string {
      return self.getText(undefined, self.locale, text, ...args);
    };
    getText.locale = function (locale: string | undefined | null, text: string, ...args: any[]): string {
      return self.getText(undefined, locale || self.locale, text, ...args);
    };
    return getText;
  }

  /** @internal */
  public createScopeLocaleText(moduleScope: string, text: string): IModuleLocale {
    const self = this;
    const getText = function (...args: any[]): string {
      return self.getText(moduleScope, self.locale, text, ...args);
    };
    getText.locale = function (locale: string | undefined | null, ...args: any[]): string {
      return self.getText(moduleScope, locale || self.locale, text, ...args);
    };
    return getText;
  }

  public getText(moduleScope: string | undefined, locale: string | undefined, key: string, ...args: any[]): string {
    return localeutil.getLocaleText(
      moduleScope ? this.localeModules[moduleScope] : undefined,
      this.locales,
      locale ?? this.locale,
      key,
      ...args,
    );
  }
}
