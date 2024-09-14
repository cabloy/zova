import { Local, Use } from 'zova';
import * as ModuleInfo from '@cabloy/module-info';
import { ScopeModule } from '../.metadata/this.js';
import { BeanRouterBase } from './bean.routerBase.js';
import { BeanRouter } from './bean.router.js';

@Local()
export class LocalRouter extends BeanRouterBase<ScopeModule> {
  @Use()
  $$router: BeanRouter;

  protected onRouterGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      // match path
      let match = to.matched.find(item => item.aliasOf);
      if (match) {
        match = match.aliasOf;
      } else {
        match = to.matched[to.matched.length - 1];
        // alias
        const configRoute = this.$$router._findConfigRoute(match?.name, match?.path);
        const alias = configRoute?.alias;
        if (alias) {
          // force load module
          const resLoadModule = await this._forceLoadModule(match?.name, match?.path);
          if (resLoadModule && resLoadModule !== true) return resLoadModule;
          if (resLoadModule === false) return to.fullPath;
          if (this.$$router.getRealRouteName(match?.name)) {
            // @ts-ignore ignore
            const routeAlias = this.$$router.resolveName(`$alias:${match?.name}`, {
              params: to.params,
              query: to.query,
            });
            return routeAlias.startsWith('/__alias__') ? routeAlias.substring('/__alias__'.length) : routeAlias;
          } else {
            return {
              path: Array.isArray(alias) ? alias[0] : alias,
              params: to.params,
              query: to.query,
            };
          }
        }
      }
      // force load module
      const resLoadModule = await this._forceLoadModule(match?.name, match?.path);
      if (resLoadModule === true) return;
      if (resLoadModule) return resLoadModule;
      // redirect again
      return to.fullPath;
    });
  }

  private async _forceLoadModule(
    name: string | symbol | null | undefined,
    path: string | undefined,
  ): Promise<string | boolean | undefined> {
    const nameOrPath = this.$$router.getRealRouteName(name) || path;
    // module info
    const moduleInfo = ModuleInfo.parseInfo(ModuleInfo.parseName(nameOrPath));
    if (!moduleInfo) {
      // donothing
      return true;
    }
    const moduleName = moduleInfo.relativeName;
    // check if exists
    if (!this.app.meta.module.exists(moduleName)) return '/404';
    // check if loaded
    const module = this.app.meta.module.get(moduleName, false);
    if (module) return true;
    // use module
    await this.app.meta.module.use(moduleName);
    // means need load
    return false;
  }
}
