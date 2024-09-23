import { BeanBaseSimple, SymbolModuleBelong } from '../beanBaseSimple.js';
import { BeanScopeError } from '../resource/error/beanScopeError.js';
import { BeanScopeService } from '../resource/service/beanScopeService.js';
import { BeanScopeLocale } from '../resource/locale/beanScopeLocale.js';
import { IModule } from '@cabloy/module-info';

export { type IModule } from '@cabloy/module-info';

const BeanModuleError = Symbol('BeanScopeBase#BeanModuleError');
const BeanModuleLocale = Symbol('BeanScopeBase#BeanModuleLocale');
const BeanModuleConfig = Symbol('BeanScopeBase#BeanModuleConfig');
const BeanModuleConstant = Symbol('BeanScopeBase#BeanModuleConstant');
const BeanModuleService = Symbol('BeanScopeBase#BeanModuleService');

export class BeanScopeBase extends BeanBaseSimple {
  private [BeanModuleError]: BeanScopeError;
  private [BeanModuleLocale]: BeanScopeLocale;
  private [BeanModuleConfig]: unknown;
  private [BeanModuleConstant]: unknown;
  private [BeanModuleService]: unknown;

  get module(): IModule {
    return this.app.meta.module.get(this[SymbolModuleBelong]) as unknown as IModule;
  }

  protected __get__(prop) {
    const moduleBelong = this[SymbolModuleBelong];
    // error
    if (prop === 'error') {
      if (!this[BeanModuleError]) {
        this[BeanModuleError] = this.bean._newBeanSimple(BeanScopeError, false, moduleBelong);
      }
      return this[BeanModuleError];
    }
    // locale
    if (prop === 'locale') {
      if (!this[BeanModuleLocale]) {
        this[BeanModuleLocale] = this.bean._newBeanSimple(BeanScopeLocale, false, moduleBelong);
      }
      return this[BeanModuleLocale];
    }
    // config
    if (prop === 'config') {
      if (!this[BeanModuleConfig]) {
        this[BeanModuleConfig] = this.app.config.modules[moduleBelong];
      }
      return this[BeanModuleConfig];
    }
    // constant
    if (prop === 'constant') {
      if (!this[BeanModuleConstant]) {
        this[BeanModuleConstant] = this.app.constant.modules[moduleBelong];
      }
      return this[BeanModuleConstant];
    }
    // service
    if (prop === 'service') {
      if (!this[BeanModuleService]) {
        this[BeanModuleService] = this.bean._newBeanSimple(BeanScopeService, false, moduleBelong);
      }
      return this[BeanModuleService];
    }
  }
}
