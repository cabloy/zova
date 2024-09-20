import fse from 'fs-extra';
import { glob } from '@cabloy/module-glob';
import tmp from 'tmp';
import { build as esBuild } from 'esbuild';
import chalk from 'chalk';
import { extend } from '@cabloy/extend';
import { pathToFileURL } from 'node:url';
import path, * as Path from 'node:path';
import { copyTemplateFile, getEnvMeta, resolveTemplatePath } from './utils.js';
import { getEnvFiles } from '@cabloy/dotenv';
import { ZovaViteConfigOptions } from './types.js';
import { ZovaConfigMeta } from 'zova-shared';

export async function generateEntryFiles(
  configMeta: ZovaConfigMeta,
  configOptions: ZovaViteConfigOptions,
  modulesMeta: Awaited<ReturnType<typeof glob>>,
) {
  // config
  await __generateConfig();
  // modules meta
  await __generateModulesMeta();
  // app component
  await __generateAppComponent();

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

  async function __generateAppComponent() {
    // dest
    const pathDest = path.join(configOptions.appDir, configOptions.runtimeDir, 'app');
    fse.ensureDirSync(pathDest);
    // src
    const files = ['controller.ts', 'render.tsx'];
    for (const file of files) {
      const fileSrc = resolveTemplatePath(`app/${file}`);
      const fileDest = path.join(pathDest, file);
      const vars = {
        appMonkey: fse.existsSync(path.join(configOptions.appDir, 'src/front/config/monkey.ts')),
        legacy: fse.existsSync(path.join(configOptions.appDir, 'src/legacy')),
      };
      await copyTemplateFile(fileSrc, fileDest, vars);
    }
  }

  async function __generateModulesMeta() {
    // modules
    const { modules, modulesArray } = modulesMeta;
    const moduleNames = modulesArray.map(item => item.info.relativeName);
    // src
    const fileSrc = resolveTemplatePath('zova-modules-meta.ejs');
    const fileDest = path.join(configOptions.appDir, configOptions.runtimeDir, 'modules-meta.ts');
    await fse.ensureDir(path.join(configOptions.appDir, configOptions.runtimeDir));
    await copyTemplateFile(fileSrc, fileDest, { modules, moduleNames });
  }

  function _pathToHref(fileName: string): string {
    return Path.sep === '\\' ? pathToFileURL(fileName).href : fileName;
  }
}
