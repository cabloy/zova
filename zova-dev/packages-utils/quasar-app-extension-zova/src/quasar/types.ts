import { ZovaConfigMeta } from 'zova-core';
import { ZovaViteConfigOptions, ZovaViteConfigResult } from 'zova-vite';

export interface ConfigContext {
  configMeta?: ZovaConfigMeta;
  configOptions?: ZovaViteConfigOptions;
  zovaViteMeta?: ZovaViteConfigResult;
}
