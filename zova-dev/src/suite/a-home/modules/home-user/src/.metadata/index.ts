/** beans: begin */
export * from '../bean/model.auth.js';
export * from '../bean/model.user.js';
import { ModelAuth } from '../bean/model.auth.js';
import { ModelUser } from '../bean/model.user.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.model.auth': ModelAuth;
    'home-user.model.user': ModelUser;
  }
}
/** beans: end */
/** pages: begin */
export * as NSControllerPageLogin from '../page/login/controller.js';
import * as NSControllerPageLogin from '../page/login/controller.js';
export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/user/login': NSControllerPageLogin.QueryInput;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {
  '/home/user/login': {
    query: NSControllerPageLogin.QuerySchema,
  },
};
export const pageNameSchemas = {};
/** pages: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** service: begin */
import service_auth from '../service/auth.js';
import service_user from '../service/user.js';
export const services = {
  auth: service_auth,
  user: service_user,
};
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser
  extends TypeModuleResource<any, any, any, (typeof locales)[TypeLocaleBase], any, typeof services> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-user': ScopeModuleHomeUser;
  }

  export interface IBeanScopeLocale {
    'home-user': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
