import { ReturnTypeHook } from '@cabloy/front';
import { RouteComponent, RouteLocationNormalizedLoaded, RouteRecordRaw, useRoute } from 'vue-router';
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

declare module '@cabloy/front' {
  export interface BeanBase {
    $router: StoreRouterLike;
    $route: ReturnTypeHook<typeof useRoute>;
  }

  export interface IModuleResource {
    routes: IModuleRoute[];
  }

  export interface IMotherDataContext {
    route: RouteLocationNormalizedLoaded;
  }
}
