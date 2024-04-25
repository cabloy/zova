import { Router } from 'vue-router';
import { IModule } from '@cabloy/module-info';
import { CabloyConfig } from '../../core/app/config.js';
import { IMonkeyApp, IMonkeySystem } from './monkey.js';
import { Constructable } from '../../decorator/index.js';
import { TypeModuleResourceLocales } from './module.js';

export interface PluginCabloyOptions {
  modulesMeta: Record<string, IModule>;
  Monkey: Constructable<IMonkeyApp & IMonkeySystem>;
  locales: TypeModuleResourceLocales;
  config: CabloyConfig;
  router: Router;
}
