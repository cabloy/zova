/** pages: begin */
export * as NSControllerPageIndex from '../page/index/controller.js';

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/index': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
/** pages: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeIndex extends BeanScopeBase {}

export interface ScopeModuleHomeIndex extends TypeModuleResource<any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-index': ScopeModuleHomeIndex;
  }
}
/** scope: end */
