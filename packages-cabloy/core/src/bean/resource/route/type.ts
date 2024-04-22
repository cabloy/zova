import { RouteComponent } from 'vue-router';

declare type Lazy<T> = () => Promise<T>;
//export type IModuleRouteComponent = Component | DefineComponent;
export type IModuleRouteComponent = RouteComponent | Lazy<RouteComponent>;

export interface IModuleRoute {
  path: string;
  component: IModuleRouteComponent;
  meta?: {
    absolute?: boolean;
    layout?: 'none' | 'default' | string | IModuleRouteComponent;
  };
}
