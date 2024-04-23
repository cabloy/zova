import { Router } from 'vue-router';
import { BeanSimple } from '../../bean/beanSimple.js';
import { CabloyApplication } from '../app/index.js';

const SymbolRouter = Symbol('SymbolRouter');

export type ViewRouterLike = ViewRouter & Router;

export class ViewRouter extends BeanSimple {
  [SymbolRouter]: Router;

  static create(app: CabloyApplication) {
    return app.bean._newBeanSimple(ViewRouter, false) as ViewRouterLike;
  }

  // get router() {
  //   return this[SymbolRouter];
  // }

  protected __get__(prop) {
    return this[SymbolRouter] && this[SymbolRouter][prop];
  }

  /** @internal */
  public async initialize(router: Router) {
    this[SymbolRouter] = router;
  }
}
