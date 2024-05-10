import { IPagePathRecord, ReturnTypeHook } from '@cabloy/front';
import { RouteComponent, RouteRecordRaw, useRoute } from 'vue-router';
import { StoreRouterLike } from './bean/store.router.js';

export type Lazy<T> = () => Promise<T>;
export type IModuleRouteComponent = RouteComponent | Lazy<RouteComponent>;
export type IModuleRoute = RouteRecordRaw;

declare module 'vue-router' {
  interface RouteMeta {
    absolute?: boolean;
    layout?: 'empty' | 'default' | false | string | IModuleRouteComponent;
    requiresAuth?: boolean;
  }
}

export interface PageResolvePath {
  <K extends keyof IPagePathRecord>(path: K): K;
}

declare module '@cabloy/front' {
  export interface BeanBase {
    $router: StoreRouterLike;
    $route: ReturnTypeHook<typeof useRoute>;
    $path: PageResolvePath;
  }

  export interface IModuleResource {
    routes: IModuleRoute[];
  }
}
