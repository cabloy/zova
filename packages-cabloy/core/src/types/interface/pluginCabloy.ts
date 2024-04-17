import { Router } from 'vue-router';
import { IModule } from '@cabloy/module-info';
import { CabloyConfig } from '../../core/app/config.js';
import { IMonkeyApp } from './monkey.js';
import { Constructable } from '../../decorator/index.js';
import { TypeModuleResourceLocales } from './module.js';

export interface PluginCabloyModulesMeta {
  modules: Record<string, IModule>;
  monkey: Record<string, IModule>;
  sync: Record<string, IModule>;
  async: Record<string, IModule>;
}

export interface PluginCabloyOptions {
  modulesMeta: PluginCabloyModulesMeta;
  Monkey: Constructable<IMonkeyApp>;
  locales: TypeModuleResourceLocales;
  config: CabloyConfig;
  router: Router;
}
