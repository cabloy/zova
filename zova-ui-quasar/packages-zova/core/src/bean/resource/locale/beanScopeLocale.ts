import { IModuleLocale } from './type.js';
import { BeanSimple } from '../../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeLocale#ModuleScope');

export class BeanScopeLocale extends BeanSimple {
  // @ts-ignore: ignore
  private [BeanModuleScope]: string;
  private __instances: Record<string, IModuleLocale> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.app.meta.locale.createScopeLocaleText(this[BeanModuleScope], prop);
    }
    return this.__instances[prop];
  }
}
