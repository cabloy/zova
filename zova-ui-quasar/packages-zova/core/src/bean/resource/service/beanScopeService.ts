import { BeanSimple } from '../../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeLocale#ModuleScope');

export class BeanScopeService extends BeanSimple {
  // @ts-ignore: ignore
  private [BeanModuleScope]: string;
  private __instances: Record<string, object> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop) {
    if (!this.__instances[prop]) {
      const module = this.app.meta.module.get(this[BeanModuleScope]);
      const services = module!.resource.services;
      if (!services || !services[prop]) return undefined;
      this.__instances[prop] = services[prop](this.app);
    }
    return this.__instances[prop];
  }
}
