import { ZovaApplication } from '../../../core/app/application.js';

export type TypeModuleConfig<T extends (app: ZovaApplication) => object> = ReturnType<T>;

export interface IModuleConfigBroadcast {
  bean: string | { module: string; name: string };
}

export interface IModuleConfigMiddleware {
  bean: string | { module: string; name: string };
  global?: boolean;
  dependencies?: string | string[];
}

export interface IModuleConfigQueue {
  bean: string | { module: string; name: string };
}

export interface IModuleConfigStartup {
  bean: string | { module: string; name: string };
  instance?: boolean;
  debounce?: boolean;
}

export interface IModuleConfigSchedule {
  bean: string | { module: string; name: string };
  repeat: {
    every?: number;
    cron?: string;
  };
  disable?: boolean;
}
