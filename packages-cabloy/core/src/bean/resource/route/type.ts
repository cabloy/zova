import { Component, DefineComponent } from 'vue';

export type IModuleRouteComponent = Component | DefineComponent;

export interface IModuleRoute {
  path: string;
  component: IModuleRouteComponent;
}
