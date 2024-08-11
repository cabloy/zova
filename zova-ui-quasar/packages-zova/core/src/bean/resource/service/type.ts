import { ZovaApplication } from '../../../core/app/application.js';

export type TypeModuleServices<T extends Record<string, (app: ZovaApplication) => object> | unknown> =
  T extends Record<string, (app: ZovaApplication) => object>
    ? {
        [K in keyof T]: ReturnType<T[K]>;
      }
    : never;
