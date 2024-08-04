import { IComponentLayoutRecord, IPageNameRecord, IPagePathRecord, TypePageSchemas } from 'zova';
import { RouteComponent, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { BeanRouter } from './bean/bean.router.js';

export type Lazy<T> = () => Promise<T>;
export type IModuleRouteComponent = RouteComponent | Lazy<RouteComponent>;
export type IModuleRoute = RouteRecordRaw;

import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    absolute?: boolean;
    layout?: keyof IComponentLayoutRecord | 'empty' | 'default' | false | IModuleRouteComponent;
    requiresAuth?: boolean;
    name?: string;
    componentKey?: ((route: RouteLocationNormalizedLoaded) => string) | string;
    tabKey?: ((route: RouteLocationNormalizedLoaded) => string) | string;
    keepAlive?: ((route: RouteLocationNormalizedLoaded) => boolean) | boolean;
  }
}

declare module 'zova' {
  export interface BeanBase {
    $router: BeanRouter;
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

  export interface ZovaConfigRoutes {
    path: Record<keyof IPagePathRecord, IModuleRoute>;
    name: Record<keyof IPageNameRecord, IModuleRoute>;
  }
}
