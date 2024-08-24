import { ZovaConfigMeta } from 'zova-shared';
import { ZovaViteConfigOptions, ZovaViteConfigResult } from 'zova-vite';

export interface ConfigContext {
  configMeta?: ZovaConfigMeta;
  configOptions?: ZovaViteConfigOptions;
  zovaViteMeta?: ZovaViteConfigResult;
}
