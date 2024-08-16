import babel from '@cabloy/vite-plugin-babel';
// import vitePluginChecker from 'vite-plugin-checker';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { vitePluginFakeServer } from '@zhennann/vite-plugin-fake-server';
import { ZovaViteConfigOptions, ZovaVitePlugin } from './types.js';
import { getMockPath } from './utils.js';
import { glob } from '@cabloy/module-glob';
//import path from 'node:path';
//import fse from 'fs-extra';

export function generateVitePlugins(
  configOptions: ZovaViteConfigOptions,
  modulesMeta: Awaited<ReturnType<typeof glob>>,
) {
  const vitePlugins: ZovaVitePlugin[] = [];
  vitePlugins.push(__getVitePluginTs());
  vitePlugins.push(__getVitePluginTsx());
  if (process.env.MOCK_ENABLED === 'true') {
    vitePlugins.push(__getVitePluginMock(configOptions, modulesMeta));
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
    ] as ZovaVitePlugin;
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
    ] as ZovaVitePlugin;
  }

  function __getVitePluginMock(configOptions: ZovaViteConfigOptions, _modulesMeta: Awaited<ReturnType<typeof glob>>) {
    const include = getMockPath(configOptions, true);
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
    ] as ZovaVitePlugin;
  }

  // function __prepareMockIncludes(
  //   includes: string[],
  //   configOptions: ZovaViteConfigOptions,
  //   modulesMeta: Awaited<ReturnType<typeof glob>>,
  // ) {
  //   // modules
  //   const { modules } = modulesMeta;
  //   // loop
  //   for (const moduleName in modules) {
  //     const module = modules[moduleName];
  //     const mockPath = path.join(module.root, 'mock');
  //     if (fse.existsSync(mockPath)) {
  //       const relativePath = path.relative(configOptions.appDir, mockPath);
  //       includes.push(`${relativePath}/**/*.mock.ts`);
  //     }
  //   }
  // }

  // function __getVitePluginChecker(configOptions: ZovaViteConfigOptions) {
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
  //   ] as ZovaVitePlugin;
  // }
}
