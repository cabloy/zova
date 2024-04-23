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

  // get router() {
  //   return this[SymbolRouter];
  // }

  protected __get__(prop) {
    return this[SymbolRouter] && this[SymbolRouter][prop];
  }

  /** @internal */
  public async initialize(router: Router) {
    this[SymbolRouter] = router;
    this._routerGuards();
    // monkey: routerGuards
    await this.app.meta.module._monkeyModule('routerGuards', undefined, this);
  }

  private _routerGuards() {
    this.app.view.router.beforeEach(async to => {
      // fullPath
      const fullPath = to.fullPath;
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
