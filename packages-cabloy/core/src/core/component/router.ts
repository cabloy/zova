import { Router } from 'vue-router';
import * as ModuleInfo from '@cabloy/module-info';
import { BeanSimple } from '../../bean/beanSimple.js';
import { CabloyApplication } from '../app/index.js';

const SymbolRouter = Symbol('SymbolRouter');

export type ViewRouterLike = ViewRouter & Router;

export class ViewRouter extends BeanSimple {
  [SymbolRouter]: Router;

  static create(app: CabloyApplication) {
    return app.bean._newBeanSimple(ViewRouter, false) as ViewRouterLike;
  }

  protected __get__(prop) {
    return this[SymbolRouter] && this[SymbolRouter][prop];
  }

  /** @internal */
  public async initialize(router: Router) {
    this[SymbolRouter] = router;
    this._routerGuards();
  }

  private _routerGuards() {
    this[SymbolRouter].beforeEach(async to => {
      // fullPath
      const fullPath = to.fullPath;
      // home
      if (fullPath === '/') {
        return { path: '/a/home/home' };
      }
      // module info
      const moduleInfo = ModuleInfo.parseInfo(fullPath);
      if (!moduleInfo) {
        // donothing
        return;
      }
      const module = this.app.meta.module.get(moduleInfo.relativeName);
      if (module) return;
      // use module
      await this.app.meta.module.use(fullPath);
      // redirect again
      return fullPath;
    });
  }
}
