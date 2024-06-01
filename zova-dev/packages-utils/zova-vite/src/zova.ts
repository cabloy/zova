import { ZovaConfigMeta } from 'zova-core';
import { ZovaViteConfigOptions, ZovaViteConfigResult } from './types.js';
import { generateVitePlugins } from './vitePlugins.js';
import { createConfigUtils } from './configUtils.js';
import { generateEntryFiles } from './generateEntryFiles.js';
import { CommonServerOptions } from 'vite';

const __SvgIconPattern = /assets\/icons\/groups\/.*?\.svg/;

export async function generateZovaViteMeta(
  configMeta: ZovaConfigMeta,
  configOptions: ZovaViteConfigOptions,
): Promise<ZovaViteConfigResult> {
  // config utils
  const configUtils = createConfigUtils(configMeta, configOptions);
  // env
  const env = configUtils.loadEnvs();
  // define
  const define = __getConfigDefine(env);
  // server
  const server = __getConfigServer();
  // build
  const build = __getConfigBuild();
  // vitePlugins
  const vitePlugins = generateVitePlugins(configOptions);
  // alias
  const alias = {
    '@vue/runtime-core': '@cabloy/vue-runtime-core',
  };
  // viteConfig
  const viteConfig = {
    root: configOptions.appDir,
    base: env.APP_PUBLIC_PATH,
    mode: configMeta.mode,
    define,
    server,
    build,
    resolve: {
      alias,
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
  };
  // generateEntryFiles
  await generateEntryFiles(configMeta, configOptions);
  // ok
  return {
    env,
    vitePlugins,
    viteConfig,
  };

  //////////////////////////////

  function __getConfigServer() {
    // proxy
    const proxy = {};
    if (process.env.PROXY_API_ENABLED === 'true') {
      proxy[process.env.PROXY_API_PREFIX!] = {
        target: process.env.PROXY_API_BASE_URL,
        changeOrigin: true,
      };
    }
    // server
    const server: CommonServerOptions = {
      proxy,
    };
    // devServerHost
    if (process.env.DEV_SERVER_HOST) {
      if (process.env.DEV_SERVER_HOST === 'true') {
        server.host = true;
      } else {
        server.host = process.env.DEV_SERVER_HOST;
      }
    }
    if (process.env.DEV_SERVER_PORT) {
      server.port = Number(process.env.DEV_SERVER_PORT);
    }
    return server;
  }

  function __getConfigDefine(env) {
    const acc = {};
    for (const key in env) {
      const val = env[key];
      acc[`process.env.${key}`] =
        val === 'true' || val === 'false'
          ? val // let's keep it as boolean and not transform it to string
          : JSON.stringify(env[key]);
    }
    return acc;
  }

  function __getConfigBuild() {
    const build = {
      rollupOptions: {
        output: {
          manualChunks: id => {
            return configUtils.configManualChunk(id);
          },
        },
      },
      assetsInlineLimit: (filePath: string) => {
        if (__SvgIconPattern.test(filePath)) {
          return 0;
        }
      },
      minify: 'terser',
      terserOptions: {
        keep_classnames: true,
      },
    };
    return build;
  }
}
