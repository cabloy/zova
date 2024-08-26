import { ZovaViteConfigOptions, ZovaViteConfigResult } from './types.js';
import { generateVitePlugins } from './vitePlugins.js';
import { createConfigUtils } from './configUtils.js';
import { generateEntryFiles } from './generateEntryFiles.js';
import { CommonServerOptions } from 'vite';
import path from 'node:path';
import { ZovaConfigMeta } from 'zova-shared';
import { setModuleAlias } from './utils.js';

const __SvgIconPattern = /assets\/icons\/groups\/.*?\.svg/;

export async function generateZovaViteMeta(
  configMeta: ZovaConfigMeta,
  configOptions: ZovaViteConfigOptions,
): Promise<ZovaViteConfigResult> {
  // config utils
  const configUtils = createConfigUtils(configMeta, configOptions);
  // env
  const env = configUtils.loadEnvs();
  // modulesMeta
  const modulesMeta = await configUtils.loadModulesMeta();
  // server
  const server = __getConfigServer();
  // build
  const build = __getConfigBuild();
  // vitePlugins
  const vitePlugins = generateVitePlugins(configOptions, modulesMeta);
  // alias
  const alias = setModuleAlias();
  // viteConfig
  const viteConfig = {
    root: configOptions.appDir,
    base: env.APP_PUBLIC_PATH,
    mode: configMeta.mode,
    server,
    build,
    resolve: {
      alias,
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
  };
  // generateEntryFiles
  await generateEntryFiles(configMeta, configOptions, modulesMeta);
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

  function __getConfigBuild() {
    const outDir = path.join(configOptions.appDir, process.env.BUILD_OUTDIR || `dist/${process.env.META_APP_MODE}`);
    const build = {
      outDir,
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
      minify: process.env.BUILD_MINIFY === 'false' ? false : 'terser',
      terserOptions: {
        keep_classnames: true,
      },
    };
    return build;
  }
}
