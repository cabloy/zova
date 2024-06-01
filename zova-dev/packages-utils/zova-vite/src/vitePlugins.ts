import babel from '@cabloy/vite-plugin-babel';
// import vitePluginChecker from 'vite-plugin-checker';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { vitePluginFakeServer } from '@zhennann/vite-plugin-fake-server';
import { CabloyViteConfigOptions, CabloyVitePlugin } from './types.js';

export function generateVitePlugins(_configOptions: CabloyViteConfigOptions) {
  const vitePlugins: CabloyVitePlugin[] = [];
  vitePlugins.push(__getVitePluginTs());
  vitePlugins.push(__getVitePluginTsx());
  if (process.env.MOCK_ENABLED === 'true') {
    vitePlugins.push(__getVitePluginMock());
  }
  // vitePlugins.push(__getVitePluginChecker(configOptions));
  return vitePlugins;

  //////////////////////////////

  function __getVitePluginTs() {
    return [
      'vite-plugin-babel',
      babel,
      {
        filter: /\.ts$/,
        babelConfig: {
          babelrc: false,
          configFile: false,
          plugins: [
            ['babel-plugin-zova-bean-module'],
            ['babel-plugin-transform-typescript-metadata'],
            ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
            ['@babel/plugin-transform-class-properties', { loose: true }],
            ['@babel/plugin-transform-typescript'],
          ],
        },
      },
      undefined,
    ] as CabloyVitePlugin;
  }

  function __getVitePluginTsx() {
    return [
      '@vitejs/plugin-vue-jsx',
      vueJsxPlugin,
      {
        include: /\.[jt]sx$/,
        babelPlugins: [
          ['babel-plugin-zova-bean-module'],
          ['babel-plugin-transform-typescript-metadata'],
          ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
        ],
      },
      undefined,
    ] as CabloyVitePlugin;
  }

  function __getVitePluginMock() {
    const include = process.env.MOCK_PATH;
    const logger = process.env.MOCK_LOGGER === 'true';
    const basename = process.env.MOCK_BASE_NAME || '';
    const build =
      process.env.MOCK_BUILD === 'true'
        ? {
            port: Number(process.env.MOCK_BUILD_PORT || 8888),
            outDir: process.env.MOCK_BUILD_OUTPUT || 'distMockServer',
          }
        : false;
    const cors = process.env.MOCK_BUILD_CORS === 'true';
    return [
      'vite-plugin-fake-server',
      vitePluginFakeServer,
      {
        include,
        exclude: ['_*'],
        infixName: 'fake',
        watch: true,
        logger,
        basename,
        enableDev: !build,
        enableProd: !build,
        build,
        cors,
      },
      undefined,
    ] as CabloyVitePlugin;
  }

  // function __getVitePluginChecker(configOptions: CabloyViteConfigOptions) {
  //   const tsconfigPath = path.join(configOptions.appDir, 'tsconfig.vue-tsc.json');
  //   return [
  //     'vite-plugin-checker',
  //     vitePluginChecker,
  //     {
  //       vueTsc: {
  //         tsconfigPath,
  //       },
  //       eslint: {
  //         lintCommand: 'eslint "./**/*.{js,ts,tsx,mjs,mts,cjs,cts,vue}"',
  //       },
  //     },
  //     { server: false },
  //   ] as CabloyVitePlugin;
  // }
}
