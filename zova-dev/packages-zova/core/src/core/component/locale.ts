import * as localeutil from '@cabloy/localeutil';
import { BeanSimple } from '../../bean/beanSimple.js';
import { TypeModuleResourceLocaleModules, TypeModuleResourceLocales } from '../../types/interface/module.js';
import { ILocalInfos, IModuleLocale, IModuleLocaleText } from '../../bean/resource/locale/type.js';
import { ZovaLocaleOptionalMap } from '../app/locale.js';
import { ref, Ref } from 'vue';

const SymbolLocaleCurrent = Symbol('SymbolLocaleCurrent');

export class AppLocale extends BeanSimple {
  private [SymbolLocaleCurrent]: Ref<string | undefined> = ref();
  /** @internal */
  public locales: TypeModuleResourceLocales = {};
  public localeModules: TypeModuleResourceLocaleModules = {};

  get current(): keyof ILocalInfos {
    let locale = this[SymbolLocaleCurrent].value;
    if (!locale) locale = this.app.meta.cookie.getItem('locale');
    if (!locale) locale = this.app.config.base.locale;
    return locale as keyof ILocalInfos;
  }

  set current(value: keyof ILocalInfos) {
    if (this[SymbolLocaleCurrent].value === value) return;
    this[SymbolLocaleCurrent].value = value;
    this.app.meta.cookie.setItem('locale', value);
  }

  /** @internal */
  public async initialize(locales: ZovaLocaleOptionalMap) {
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
  public createLocaleText(moduleScope?: string): IModuleLocaleText {
    const self = this;
    const getText = function (text: string, ...args: any[]): string {
      return self.getText(moduleScope, undefined, text, ...args);
    };
    getText.locale = function <T extends keyof ILocalInfos>(
      locale: T | undefined,
      text: string,
      ...args: any[]
    ): string {
      return self.getText(moduleScope, locale, text, ...args);
    };
    return getText;
  }

  /** @internal */
  public createScopeLocaleText(moduleScope: string, text: string): IModuleLocale {
    const self = this;
    const getText = function (...args: any[]): string {
      return self.getText(moduleScope, undefined, text, ...args);
    };
    getText.locale = function <T extends keyof ILocalInfos>(locale: T | undefined, ...args: any[]): string {
      return self.getText(moduleScope, locale, text, ...args);
    };
    return getText;
  }

  public getText<T extends keyof ILocalInfos>(
    moduleScope: string | undefined,
    locale: T | undefined,
    key: string,
    ...args: any[]
  ): string {
    return localeutil.getLocaleText(
      moduleScope ? this.localeModules[moduleScope] : undefined,
      this.locales,
      locale || this.current,
      key,
      ...args,
    );
  }
}
