import { IComponentLayoutRecord, IIconRecord, TypePageSchemas } from 'zova';
import { RouteComponent, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { BeanRouter } from './bean/bean.router.js';

export type Lazy<T> = () => Promise<T>;
export type IModuleRouteComponent = RouteComponent | Lazy<RouteComponent>;
export type IModuleRoute = RouteRecordRaw;

export interface RouteMetaTab {
  name?: string;
  key?: ((route: RouteLocationNormalizedLoaded) => string) | string;
  title?: ((route: RouteLocationNormalizedLoaded) => string) | string;
  icon?: ((route: RouteLocationNormalizedLoaded) => keyof IIconRecord) | keyof IIconRecord;
}

import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    absolute?: boolean;
    layout?: keyof IComponentLayoutRecord | 'empty' | 'default' | false | IModuleRouteComponent;
    requiresAuth?: boolean;
    tab?: RouteMetaTab;
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
}
