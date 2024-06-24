import { ZovaApplication } from '../core/app/index.js';
import { ZovaContext } from '../core/context/index.js';
import { SymbolBeanRoot } from '../types/interface/inject.js';

export class BeanSimple {
  protected app: ZovaApplication;
  protected ctx: ZovaContext;

  protected get bean() {
    return this.ctx ? this.ctx.bean : this.app.bean;
  }

  protected get beanRoot() {
    const bean = this.bean.inject(SymbolBeanRoot);
    if (!bean) {
      throw new Error('not found root bean');
    }
    return bean;
  }
}
