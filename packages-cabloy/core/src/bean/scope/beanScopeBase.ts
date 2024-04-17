import { BeanBase } from '../beanBase.js';
import { BeanScopeError } from '../resource/error/beanScopeError.js';
import { BeanScopeLocale } from '../resource/locale/beanScopeLocale.js';
import { IModule } from '@cabloy/module-info';

export { type IModule } from '@cabloy/module-info';

const BeanModuleError = Symbol('BeanScopeBase#BeanModuleError');
const BeanModuleLocale = Symbol('BeanScopeBase#BeanModuleLocale');
const BeanModuleConfig = Symbol('BeanScopeBase#BeanModuleConfig');
const BeanModuleConstant = Symbol('BeanScopeBase#BeanModuleConstant');

export class BeanScopeBase extends BeanBase {
  private [BeanModuleError]: BeanScopeError;
  private [BeanModuleLocale]: BeanScopeLocale;
  private [BeanModuleConfig]: unknown;
  private [BeanModuleConstant]: unknown;

  get module(): IModule {
    return this.app.meta.module.get(this.moduleBelong);
  }

  protected __get__(prop) {
    const moduleBelong = this.moduleBelong;
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
  }
}
