import { IModule } from '@cabloy/module-info';
import { IMonkeyModule, IMonkeySystem, IMonkeyController } from './monkey.js';
import { Constructable } from '../../decorator/index.js';
import { ZovaLocaleOptionalMap } from '../../core/app/locale.js';
import { RouteRecordRaw } from 'vue-router';
import { TypeModuleResourceConfig } from './module.js';

export interface PluginZovaModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export interface PluginZovaOptions {
  modulesMeta: PluginZovaModulesMeta;
  locales: ZovaLocaleOptionalMap;
  config: TypeModuleResourceConfig[];
  AppMonkey?: Constructable<IMonkeyModule & IMonkeySystem & IMonkeyController>;
  legacyRoutes?: RouteRecordRaw[];
}
