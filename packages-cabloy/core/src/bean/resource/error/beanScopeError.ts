import { IModuleError } from './type.js';
import { BeanSimple } from '../../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeError#ModuleScope');

export class BeanScopeError extends BeanSimple {
  private [BeanModuleScope]: string;
  private __instances: Record<string, IModuleError> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.app.meta.error.createScopeError(this[BeanModuleScope], prop);
    }
    return this.__instances[prop];
  }
}
