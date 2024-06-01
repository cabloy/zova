import { CabloyConfigMeta } from 'zova-core';
import { CabloyViteConfigChunkVendor, CabloyViteConfigOptions } from './types.js';
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

const __CabloyManualChunkVendors = [
  { match: ['@faker-js'], output: 'faker' },
  {
    match: [/cabloy\/config\.js/],
    output: '-cabloy-config',
  },
  {
    match: ['vue', '@vue', 'reflect-metadata', '@cabloy', 'packages-cabloy/core'],
    output: 'cabloy',
  },
  { match: ['vue-router'], output: 'vue-router' },
];

export function createConfigUtils(
  configMeta: CabloyConfigMeta,
  configOptions: CabloyViteConfigOptions,
): { loadEnvs: () => { [name: string]: string }; configManualChunk: (id: string) => string } {
  let __cabloyManualChunkVendors_runtime: CabloyViteConfigChunkVendor[];
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
    // modules
    let output = _configManualChunk_modules(id);
    if (output) return output;
    // vendors
    output = _configManualChunk_vendors(id);
    if (output) return output;
    // default
    if (configOptions.cabloyManualChunk.debug) {
      console.log(id);
    }
    return 'vendor';
  }

  function _configManualChunk_vendors(id: string) {
    if (!__cabloyManualChunkVendors_runtime) {
      __cabloyManualChunkVendors_runtime = configOptions.cabloyManualChunk.vendors.concat(__CabloyManualChunkVendors);
    }
    const matchItem = __cabloyManualChunkVendors_runtime.find(item => {
      return item.match.some(item => {
        if (typeof item === 'string') {
          return id.indexOf(`/${item}/`) > -1;
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
}
