import { IModule } from '@cabloy/module-info';
import { CabloyConfig } from '../../core/app/config.js';
import { IMonkeyApp, IMonkeySystem } from './monkey.js';
import { Constructable } from '../../decorator/index.js';
import { TypeModuleResourceLocales } from './module.js';

export interface PluginCabloyModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export interface PluginCabloyOptions {
  modulesMeta: PluginCabloyModulesMeta;
  Monkey: Constructable<IMonkeyApp & IMonkeySystem>;
  locales: TypeModuleResourceLocales;
  config: CabloyConfig;
}
