import { Bean, BeanBase, Cast, IModule, IPageNameRecord, IPagePathRecord, TypeEventOff } from 'zova';
import { Router } from 'vue-router';
import * as ModuleInfo from '@cabloy/module-info';
import { IModuleRoute, IModuleRouteComponent } from '../types.js';
import { getRealRouteName } from '../utils.js';

const SymbolRouter = Symbol('SymbolRouter');

export interface BeanRouter extends Router {}

@Bean()
export class BeanRouter extends BeanBase {
  [SymbolRouter]: Router;
  eventRouterGuards: TypeEventOff;

  get router(): Router {
    return this[SymbolRouter];
  }

  protected __get__(prop) {
    return this[SymbolRouter] && this[SymbolRouter][prop];
  }

  protected async __init__(router?: Router) {
    if (router) {
      this[SymbolRouter] = router;
    } else {
      // app router
      router = this.bean.inject('a-router:appRouter');
      if (!router) {
        throw new Error('Should provide router');
      }
      this[SymbolRouter] = router;
      // provide
      this.app.vue.provide('a-router:router', this);
      this.bean.provide('a-router:router', this);
      // config.routes
      this._loadConfigRoutes();
      // event
      this.eventRouterGuards = this.app.meta.event.on('a-router:routerGuards', async (context, next) => {
        this._routerGuards(context.data);
        await next();
      });
    }
  }

  protected __dispose__() {
    if (this.eventRouterGuards) {
      this.eventRouterGuards();
    }
  }

  public createAsyncComponent(component: string | IModuleRouteComponent) {
    if (typeof component !== 'string') return component;
    return this.app.meta.component.createAsyncComponent(component);
  }

  public resolveName<K extends keyof IPageNameRecord>(name: K, options?: IPageNameRecord[K]): string {
    const params = Cast(options)?.params;
    const query = Cast(options)?.query;
    return this._resolveNameOrPath(query, query => {
      const route = this[SymbolRouter].resolve({ name, params, query });
      return route.fullPath;
    });
  }

  public resolvePath<K extends keyof IPagePathRecord>(path: K, query?: IPagePathRecord[K]): string {
    return this._resolveNameOrPath(query, query => {
      const route = this[SymbolRouter].resolve({ path, query });
      return route.fullPath;
    });
  }

  public checkPathValid(to?: { name?: string; path?: string } | string): boolean {
    const _path = to && typeof to === 'object' ? to.name ?? to.path : to;
    if (!_path) return true;
    const moduleName = ModuleInfo.parseName(_path);
    if (!moduleName) return true;
    return this.app.meta.module.exists(moduleName);
  }

  private _resolveNameOrPath(query, fn) {
    const query1 = {};
    const query2: any = [];
    if (query) {
      for (const key in query) {
        const value = query[key];
        if (value && typeof value === 'object') {
          query2.push([key, value]);
        } else {
          query1[key] = value;
        }
      }
    }
    // resolve
    const fullPath = fn(query1);
    // query2
    const query2str = query2
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      })
      .join('&');
    // join
    if (!query2str) return fullPath;
    const join = Object.keys(query1).length > 0 ? '&' : '?';
    return `${fullPath}${join}${query2str}`;
  }

  private _routerGuards(router: BeanRouter) {
    router.beforeEach(async to => {
      // match path
      let match = to.matched.find(item => item.aliasOf);
      if (match) {
        match = match.aliasOf;
      } else {
        match = to.matched[to.matched.length - 1];
        // alias
        const configRoute = this._findConfigRoute(match?.name, match?.path);
        const alias = configRoute?.alias;
        if (alias) {
          if (match?.name) {
            // @ts-ignore ignore
            const routeAlias = this.resolveName(`$alias:${match?.name}`, {
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
      const matchNameOrPath = this.getRealRouteName(match?.name) || match?.path;
      // module info
      const moduleInfo = ModuleInfo.parseInfo(ModuleInfo.parseName(matchNameOrPath));
      if (!moduleInfo) {
        // donothing
        return;
      }
      const moduleName = moduleInfo.relativeName;
      // check if exists
      if (!this.app.meta.module.exists(moduleName)) return '/404';
      // check if loaded
      const module = this.app.meta.module.get(moduleName, false);
      if (module) return;
      // use module
      await this.app.meta.module.use(moduleName);
      // redirect again
      return to.fullPath;
    });
  }

  /** @internal */
  public _registerRoutes(module: IModule) {
    if (!module.resource.routes) return null;
    for (const route of module.resource.routes) {
      this._registerRoute(module, route);
    }
  }

  private _registerRoute(module: IModule, route: IModuleRoute) {
    // path
    let path: string | undefined;
    if (route.path) {
      if (route.meta?.absolute === true) {
        path = route.path;
      } else {
        path = `/${module.info.pid}/${module.info.name}/${route.path}`;
      }
    }
    // name
    let name: string | undefined;
    if (route.name) {
      if (route.meta?.absolute === true) {
        name = String(route.name);
      } else {
        name = `${module.info.relativeName}:${String(route.name)}`;
      }
    }
    // config route
    const configRoute = name ? this.app.config.routes.name[name] : this.app.config.routes.path[path!];
    if (configRoute) {
      route = this.app.meta.util.extend({}, route, configRoute);
    }
    // name alias
    if (name && configRoute?.alias) {
      // add extra route
      this.router.addRoute({ name: `$alias:${name}`, path: `/__alias__${configRoute?.alias}`, redirect: '' });
    }
    // name
    if (!name) {
      name = `$:${path}`;
    }
    // meta
    const meta = route.meta;
    // component
    const component = route.component;
    // layout / routeData
    let layout = meta?.layout;
    let routeData;
    let routeNameParent;
    if (layout === false) {
      routeData = { ...route, name, path, component, meta };
    } else {
      if (layout === undefined || layout === 'default') {
        layout = this.app.config.layout.component.default;
      } else if (layout === 'empty') {
        layout = this.app.config.layout.component.empty;
      }
      routeNameParent = `$:${name}`;
      routeData = {
        name: routeNameParent,
        path,
        component: this.createAsyncComponent(layout as any),
        children: [{ ...route, name, path: '', component, meta }],
      };
    }
    // force delete
    if (this.router.hasRoute(routeNameParent)) {
      this.router.removeRoute(routeNameParent);
    }
    if (this.router.hasRoute(name)) {
      this.router.removeRoute(name);
    }
    // add
    this.router.addRoute(routeData);
  }

  private _loadConfigRoutes() {
    const routesPath = this.app.config.routes.path;
    for (const key in routesPath) {
      const route = routesPath[key];
      this._loadConfigRoute({ ...route, path: key, name: `$:${key}` });
    }
    const routesName = this.app.config.routes.name;
    for (const key in routesName) {
      const route = routesName[key];
      this._loadConfigRoute({ ...route, name: key });
    }
  }

  private _findConfigRoute(name: string | symbol | undefined, path: string | undefined): IModuleRoute | undefined {
    name = this.getRealRouteName(name);
    return name ? this.app.config.routes.name[name] : this.app.config.routes.path[path!];
  }

  private _loadConfigRoute(route: IModuleRoute) {
    this.router.addRoute(route);
  }

  getRealRouteName(name?: string | symbol): string | undefined {
    return getRealRouteName(name);
  }
}
