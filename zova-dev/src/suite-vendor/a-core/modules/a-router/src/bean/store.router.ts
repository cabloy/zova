import { BeanBase, Cast, IModule, IPageNameRecord, IPagePathRecord, Store, TypeEventOff } from 'zova';
import { Router } from 'vue-router';
import * as ModuleInfo from '@cabloy/module-info';
import { IModuleRoute, IModuleRouteComponent } from '../types.js';

const SymbolRouter = Symbol('SymbolRouter');

export type StoreRouterLike = StoreRouter & Router;

@Store()
export class StoreRouter extends BeanBase {
  [SymbolRouter]: Router;
  eventRouterGuards: TypeEventOff;

  get router(): Router {
    return this[SymbolRouter];
  }

  protected __get__(prop) {
    return this[SymbolRouter] && this[SymbolRouter][prop];
  }

  protected async __init__(router?: Router) {
    if (!router) {
      // app router
      router = this.bean.inject('a-router:appRouter');
      if (!router) {
        throw new Error('Should provide router');
      }
      this.bean.provide('a-router:router', Cast<StoreRouterLike>(this));
      // event
      this.eventRouterGuards = this.app.meta.event.on('a-router:routerGuards', async (context, next) => {
        this._routerGuards(context.data);
        await next();
      });
    }
    this[SymbolRouter] = router;
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

  private _routerGuards(router: StoreRouterLike) {
    router.beforeEach(async to => {
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

  /** @internal */
  public _registerRoutes(module: IModule) {
    if (!module.resource.routes) return null;
    for (const route of module.resource.routes) {
      this._registerRoute(module, route);
    }
  }

  private _registerRoute(module: IModule, route: IModuleRoute) {
    // meta
    const meta = route.meta;
    // name
    let name: string | undefined;
    if (route.name) {
      if (meta?.absolute === true) {
        name = String(route.name);
      } else {
        name = `${module.info.relativeName}:${String(route.name)}`;
      }
    }
    // path
    let path: string | undefined;
    if (route.path) {
      if (meta?.absolute === true) {
        path = route.path;
      } else {
        path = `/${module.info.pid}/${module.info.name}/${route.path}`;
      }
    }
    // component
    const component = route.component;
    // layout / routeData
    let layout = meta?.layout;
    let routeData;
    if (layout === false) {
      routeData = { ...route, name, path, component, meta };
    } else {
      if (layout === undefined || layout === 'default') {
        layout = this.app.config.layout.component.default;
      } else if (layout === 'empty') {
        layout = this.app.config.layout.component.empty;
      }
      routeData = {
        path,
        component: this.createAsyncComponent(layout as any),
        children: [{ ...route, name, path: '', component, meta }],
      };
    }
    // add
    this.router.addRoute(routeData);
  }
}
