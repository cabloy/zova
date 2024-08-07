import { ZovaConfigMeta } from 'zova-core';
import { ZovaViteConfigChunkVendor, ZovaViteConfigOptions } from './types.js';
import path from 'path';
import * as dotenv from '@cabloy/dotenv';
import { getEnvMeta, getMockPath } from './utils.js';
import { glob } from '@cabloy/module-glob';
import { IBundleVendor } from '@cabloy/module-info';

const __ModuleLibs = [
  /src\/module\/([^\/]*?)\//,
  /src\/module-vendor\/([^\/]*?)\//,
  /src\/suite\/.*\/modules\/([^\/]*?)\//,
  /src\/suite-vendor\/.*\/modules\/([^\/]*?)\//,
  /\/zova-module-([^\/]*?)\//,
];

const __ZovaManualChunkVendors = [
  { match: ['@faker-js'], output: 'faker' },
  {
    match: [/\.zova\/config\.ts/],
    output: '-zova-config',
  },
  {
    match: [
      'vue/dist',
      '@vue/runtime-dom/dist',
      '@vue/shared/dist',
      '@vue/reactivity/dist',
      'vue/jsx-runtime',
      '@cabloy/vue-runtime-core/dist',
      '@cabloy/vue-reactivity/dist',
    ],
    output: 'vue',
  },
  {
    match: ['reflect-metadata', '@cabloy', 'zova', 'zova-core', 'packages-zova/core'],
    output: 'zova',
  },
  { match: ['vue-router', '@cabloy/vue-router'], output: 'vue-router' },
  { match: ['pinia'], output: 'pinia' },
  { match: ['js-cookie'], output: 'js-cookie' },
];

export function createConfigUtils(
  configMeta: ZovaConfigMeta,
  configOptions: ZovaViteConfigOptions,
): {
  loadEnvs: () => { [name: string]: string };
  loadModulesMeta: () => ReturnType<typeof glob>;
  configManualChunk: (id: string) => string;
} {
  let __zovaManualChunkVendors_runtime: ZovaViteConfigChunkVendor[];
  let __zovaManualChunkVendors_runtime_modulesBefore: ZovaViteConfigChunkVendor[];
  let __modulesMeta: Awaited<ReturnType<typeof glob>>;
  return {
    loadEnvs: __loadEnvs,
    loadModulesMeta: __loadModulesMeta,
    configManualChunk: __configManualChunk,
  };

  //////////////////////////////

  function __loadEnvs() {
    const meta = getEnvMeta(configMeta);
    const envDir = path.join(configOptions.appDir, 'env');
    const envs = dotenv.loadEnvs(meta, envDir, '.env');
    const res = Object.assign(
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
    for (const key of ['NODE_ENV', 'META_FLAVOR', 'META_MODE', 'META_APP_MODE']) {
      process.env[key] = res[key];
    }
    return res;
  }

  async function __loadModulesMeta() {
    // modules
    __modulesMeta = await glob({
      projectMode: 'zova',
      projectPath: configOptions.appDir,
      disabledModules: process.env.PROJECT_DISABLED_MODULES,
      disabledSuites: process.env.PROJECT_DISABLED_SUITES,
      log: true,
    });
    return __modulesMeta;
  }

  function __configManualChunk_adjustId(id: string) {
    //
    id = id.replace(/\\/gi, '/');
    const appDir = configOptions.appDir.replace(/\\/gi, '/');
    //
    let index = id.indexOf(appDir);
    if (index > -1) {
      id = id.substring(index + appDir.length);
    }
    //
    index = id.lastIndexOf('node_modules');
    if (index > -1) {
      id = id.substring(index + 'node_modules'.length);
    }
    return id;
  }

  function __configManualChunk(id: string) {
    id = __configManualChunk_adjustId(id);
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
    return null;
    // return 'vendor';
  }

  function _configManualChunk_vendorsDefault() {
    return __ZovaManualChunkVendors;
  }

  function _configManualChunk_vendorsModules() {
    // vendors
    let vendors: IBundleVendor[] = [];
    // modules
    const { modules } = __modulesMeta;
    // loop
    for (const moduleName in modules) {
      const module = modules[moduleName];
      const vendorsModule = module.package.zovaModule?.bundle?.vendors;
      if (vendorsModule) {
        vendors = vendors.concat(vendorsModule);
      }
    }
    return vendors;
  }

  function _configManualChunk_vendorsModulesBefore() {
    const vendors: any = [];
    if (process.env.MOCK_ENABLED === 'true') {
      vendors.push({
        match: [`~${getMockPath(configOptions, true)}`],
        output: '-zova-mock',
      });
    }
    return vendors;
  }

  function _configManualChunk_vendors(id: string) {
    if (!__zovaManualChunkVendors_runtime) {
      __zovaManualChunkVendors_runtime = _configManualChunk_vendorsDefault()
        .concat(_configManualChunk_vendorsModules() as any)
        .concat(configOptions.zovaManualChunk.vendors as any);
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
    if (!__zovaManualChunkVendors_runtime_modulesBefore) {
      __zovaManualChunkVendors_runtime_modulesBefore = _configManualChunk_vendorsModulesBefore();
    }
    return _configManualChunk_match(id, __zovaManualChunkVendors_runtime_modulesBefore);
  }
}
