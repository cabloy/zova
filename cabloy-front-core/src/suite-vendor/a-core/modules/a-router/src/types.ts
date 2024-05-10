import { IPageNameRecord, IPagePathRecord, ReturnTypeHook } from '@cabloy/front';
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
  // this line will stop the ts autocompletion
  //<K extends keyof IPagePathRecord>(path: K): K;
  <K extends keyof IPageNameRecord>({
    name,
    params,
    query,
  }: {
    name: K;
    params?: IPageNameRecord[K] extends { Params: object } ? IPageNameRecord[K]['Params'] : never;
    query?: IPageNameRecord[K] extends { Query: object } ? IPageNameRecord[K]['Query'] : never;
  }): string;
  <K extends keyof IPagePathRecord>({
    path,
    params,
    query,
  }: {
    path: K;
    params?: IPagePathRecord[K] extends { Params: object } ? IPagePathRecord[K]['Params'] : never;
    query?: IPagePathRecord[K] extends { Query: object } ? IPagePathRecord[K]['Query'] : never;
  }): string;
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
