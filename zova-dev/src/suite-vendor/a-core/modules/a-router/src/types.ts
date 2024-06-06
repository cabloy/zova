import { IComponentRecord, TypePageSchemas } from 'zova';
import { RouteComponent, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { StoreRouterLike } from './bean/store.router.js';

export type Lazy<T> = () => Promise<T>;
export type IModuleRouteComponent = RouteComponent | Lazy<RouteComponent>;
export type IModuleRoute = RouteRecordRaw;

import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    absolute?: boolean;
    layout?: keyof IComponentRecord | 'empty' | 'default' | false | IModuleRouteComponent;
    requiresAuth?: boolean;
  }
}

declare module 'zova' {
  export interface BeanBase {
    $router: StoreRouterLike;
  }

  export interface IModuleResource {
    routes: IModuleRoute[];
  }

  export interface IControllerDataContext {
    route: RouteLocationNormalizedLoaded;
  }

  export interface IModuleResource {
    pagePathSchemas?: TypePageSchemas;
    pageNameSchemas?: TypePageSchemas;
  }
}
