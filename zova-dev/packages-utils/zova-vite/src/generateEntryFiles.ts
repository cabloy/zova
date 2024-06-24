import { readFileSync } from 'node:fs';
import fse from 'fs-extra';
import compileTemplate from 'lodash/template.js';
import { glob } from '@cabloy/module-glob';
import tmp from 'tmp';
import { build as esBuild } from 'esbuild';
import chalk from 'chalk';
import { extend } from '@cabloy/extend';
import { pathToFileURL } from 'node:url';
import path, * as Path from 'node:path';
import { getEnvMeta, getMockPath } from './utils.js';
import { getEnvFiles } from '@cabloy/dotenv';
import { ZovaConfigMeta } from 'zova-core';
import { ZovaViteConfigOptions } from './types.js';

export async function generateEntryFiles(configMeta: ZovaConfigMeta, configOptions: ZovaViteConfigOptions) {
  // modules
  const modulesMeta = await glob({
    projectMode: 'zova',
    projectPath: configOptions.appDir,
    disabledModules: process.env.PROJECT_DISABLED_MODULES,
    disabledSuites: process.env.PROJECT_DISABLED_SUITES,
    log: true,
  });
  // config
  await __generateConfig();
  // modules meta
  await __generateModulesMeta();
  // app component
  await __generateAppComponent();
  // mock files
  await __generateMockFiles();

  //////////////////////////////

  async function __generateConfig() {
    // check config
    let configDir = path.join(configOptions.appDir, 'src/front/config');
    if (!fse.existsSync(configDir)) {
      console.log(chalk.red('path not found: src/front/config\n'));
      process.exit(0);
    }
    // meta
    const meta = getEnvMeta(configMeta);
    configDir = path.join(configOptions.appDir, 'src/front/config/config');
    const files = getEnvFiles(meta, configDir, 'config', '.ts')!;
    const targetMeta: any = { ...meta };
    delete targetMeta.mine;
    const target = {
      meta: targetMeta,
      env: {
        appServer: process.env.APP_SERVER === 'true',
        appRouterMode: process.env.APP_ROUTER_MODE,
        appRouterBase: process.env.APP_ROUTER_BASE,
        appPublicPath: process.env.APP_PUBLIC_PATH,
        appName: process.env.APP_NAME,
        appTitle: process.env.APP_TITLE,
        appVersion: process.env.APP_VERSION,
      },
    };
    for (const file of files) {
      const config = await __loadConfig(file, targetMeta);
      if (config) {
        extend(true, target, config);
      }
    }
    // output
    const contentDest = `import { ZovaConfig } from 'zova';\nexport default ${JSON.stringify(target, null, 2)} as ZovaConfig;`;
    const fileDest = path.join(configOptions.appDir, configOptions.runtimeDir, 'config.ts');
    fse.ensureFileSync(fileDest);
    fse.writeFileSync(fileDest, contentDest, 'utf-8');
    // ok
    return target;
  }

  async function __loadConfig(fileName: string, meta) {
    // temp
    const fileTempObj = tmp.fileSync({ postfix: '.mjs' });
    const fileTemp = fileTempObj.name;
    // build
    const esBuildConfig = __createEsbuildConfig(fileName, fileTemp);
    await esBuild(esBuildConfig as any);
    // load
    const fnResult = await import(_pathToHref(fileTemp));
    const configFn = fnResult.default || fnResult;
    const config = await configFn(meta);
    // delete temp
    fileTempObj.removeCallback();
    // ok
    return config;
  }

  function __createEsbuildConfig(fileSrc: string, fileDest: string) {
    return {
      platform: 'node',
      format: 'esm',
      bundle: true,
      packages: 'external',
      resolveExtensions: ['.mjs', '.js', '.mts', '.ts', '.json'],
      entryPoints: [fileSrc],
      outfile: fileDest,
    };
  }

  async function __generateMockFiles() {
    // clear dest
    const pathDest = getMockPath(configOptions);
    if (fse.existsSync(pathDest)) {
      await fse.emptyDir(pathDest);
      await fse.rmdir(pathDest);
    }
    // check enabled
    if (process.env.MOCK_ENABLED !== 'true') return;
    await fse.ensureDir(pathDest);
    // modules
    const { modules } = modulesMeta;
    // loop
    for (const moduleName in modules) {
      const module = modules[moduleName];
      const mockPath = path.join(module.root, 'mock');
      if (!fse.existsSync(mockPath)) continue;
      await fse.copy(mockPath, path.join(pathDest, moduleName));
    }
  }

  async function __generateAppComponent() {
    // dest
    const pathDest = path.join(configOptions.appDir, configOptions.runtimeDir, 'app');
    fse.ensureDirSync(pathDest);
    // src
    const files = ['controller.ts', 'render.tsx'];
    for (const file of files) {
      const fileSrc = new URL(`../templates/app/${file}`, import.meta.url);
      const fileDest = path.join(pathDest, file);
      fse.copyFileSync(fileSrc, fileDest);
    }
  }

  async function __generateModulesMeta() {
    // modules
    const { modules, modulesArray } = modulesMeta;
    const moduleNames = modulesArray.map(item => item.info.relativeName);
    // src
    const fileSrc = new URL('../templates/zova-modules-meta.ejs', import.meta.url);
    const contentSrc = readFileSync(fileSrc, 'utf8');
    const template = compileTemplate(contentSrc);
    // dest
    const contentDest = template({ modules, moduleNames });
    const fileDest = path.join(configOptions.appDir, configOptions.runtimeDir, 'modules-meta.ts');
    fse.ensureFileSync(fileDest);
    fse.writeFileSync(fileDest, contentDest, 'utf-8');
  }

  function _pathToHref(fileName: string): string {
    return Path.sep === '\\' ? pathToFileURL(fileName).href : fileName;
  }
}
