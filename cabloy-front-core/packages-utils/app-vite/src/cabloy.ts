import { CabloyConfigMeta } from '@cabloy/front';
import { CabloyViteConfigOptions, CabloyViteConfigResult } from './types.js';
import { generateVitePlugins } from './vitePlugins.js';
import { createConfigUtils } from './configUtils.js';
import { generateEntryFiles } from './generateEntryFiles.js';

const __SvgIconPattern = /assets\/icons\/groups\/.*?\.svg/;

export async function generateCabloyViteMeta(
  configMeta: CabloyConfigMeta,
  configOptions: CabloyViteConfigOptions,
): Promise<CabloyViteConfigResult> {
  // config utils
  const configUtils = createConfigUtils(configMeta, configOptions);
  // env
  const env = configUtils.loadEnvs();
  // define
  const define = __getBuildDefine(env);
  // alias
  const alias = {
    '@vue/runtime-core': '@cabloy/vue-runtime-core',
  };
  // proxy
  const proxy = {};
  if (process.env.PROXY_API_ENABLED === 'true') {
    proxy[process.env.PROXY_API_PREFIX!] = {
      target: process.env.PROXY_API_BASE_URL,
      changeOrigin: true,
    };
  }
  // vitePlugins
  const vitePlugins = generateVitePlugins(configOptions);
  // viteConfig
  const viteConfig = {
    root: configOptions.appDir,
    base: env.APP_PUBLIC_PATH,
    mode: configMeta.mode,
    define,
    resolve: {
      alias,
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    build: {
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
    },
    server: {
      proxy,
    },
  };
  // generateEntryFiles
  await generateEntryFiles(configMeta, configOptions);
  // ok
  return {
    env,
    alias,
    proxy,
    vitePlugins,
    viteConfig,
  };

  //////////////////////////////

  function __getBuildDefine(env) {
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
}
