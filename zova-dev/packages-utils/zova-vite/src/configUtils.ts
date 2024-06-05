import { ZovaConfigMeta } from 'zova-core';
import { ZovaViteConfigChunkVendor, ZovaViteConfigOptions } from './types.js';
import path from 'path';
import * as dotenv from '@cabloy/dotenv';
import { getEnvMeta } from './utils.js';

const __ModuleLibs = [
  /src\/module\/([^\/]*?)\//,
  /src\/module-vendor\/([^\/]*?)\//,
  /src\/suite\/.*\/modules\/([^\/]*?)\//,
  /src\/suite-vendor\/.*\/modules\/([^\/]*?)\//,
  /node_modules\/zova-module-([^\/]*?)\//,
];

const __ZovaManualChunkVendors = [
  { match: ['@faker-js'], output: 'faker' },
  {
    match: [/zova\/config\.js/],
    output: '-zova-config',
  },
  {
    match: ['vue', '@vue', 'reflect-metadata', 'zova', 'packages-zova/core'],
    output: 'zova',
  },
  { match: ['vue-router'], output: 'vue-router' },
];

export function createConfigUtils(
  configMeta: ZovaConfigMeta,
  configOptions: ZovaViteConfigOptions,
): { loadEnvs: () => { [name: string]: string }; configManualChunk: (id: string) => string } {
  let __zovaManualChunkVendors_runtime: ZovaViteConfigChunkVendor[];
  return {
    loadEnvs: __loadEnvs,
    configManualChunk: __configManualChunk,
  };

  //////////////////////////////

  function __loadEnvs() {
    const meta = getEnvMeta(configMeta);
    const envDir = path.join(configOptions.appDir, 'env');
    const envs = dotenv.loadEnvs(meta, envDir, '.env');
    return Object.assign(
      {
        NODE_ENV: meta.mode,
      },
      envs,
      {
        META_FLAVOR: meta.flavor,
        META_MODE: meta.mode,
        META_APP_MODE: meta.appMode,
      },
    );
  }

  function __configManualChunk(id: string) {
    id = id.replace(/\\/gi, '/');
    // modules before
    let output = _configManualChunk_modulesBefore(id);
    if (output) return output;
    // modules
    output = _configManualChunk_modules(id);
    if (output) return output;
    // vendors
    output = _configManualChunk_vendors(id);
    if (output) return output;
    // default
    if (configOptions.zovaManualChunk.debug) {
      console.log(id);
    }
    return 'vendor';
  }

  function _configManualChunk_vendorsDefault() {
    return __ZovaManualChunkVendors;
  }

  function _configManualChunk_vendorsModulesBefore() {
    const vendors: any = [];
    if (process.env.MOCK_ENABLED === 'true') {
      vendors.push({
        match: [`~${process.env.MOCK_PATH}`],
        output: '-zova-mock',
      });
    }
    return vendors;
  }

  function _configManualChunk_vendors(id: string) {
    if (!__zovaManualChunkVendors_runtime) {
      __zovaManualChunkVendors_runtime = configOptions.zovaManualChunk.vendors.concat(
        _configManualChunk_vendorsDefault(),
      );
    }
    return _configManualChunk_match(id, __zovaManualChunkVendors_runtime);
  }

  function _configManualChunk_match(id: string, vendors) {
    const matchItem = vendors.find(item => {
      return item.match.some(item => {
        if (typeof item === 'string') {
          const matchItem = item[0] === '~' ? item.substring(1) : `/${item}/`;
          return id.indexOf(matchItem) > -1;
        }
        return item.test(id);
      });
    });
    if (matchItem) return matchItem.output;
    return null;
  }

  function _configManualChunk_modules(id: string) {
    for (const moduleLib of __ModuleLibs) {
      const matched = id.match(moduleLib);
      if (matched) return matched[1];
    }
    return null;
  }

  function _configManualChunk_modulesBefore(id: string) {
    return _configManualChunk_match(id, _configManualChunk_vendorsModulesBefore());
  }
}
