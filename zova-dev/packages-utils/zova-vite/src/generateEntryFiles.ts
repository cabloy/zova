import fse from 'fs-extra';
import { glob } from '@cabloy/module-glob';
import chalk from 'chalk';
import path from 'node:path';
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
    const filenames = files.map(item => path.basename(item));
    const imports: string[] = [];
    const constNames: string[] = [];
    for (const filename of filenames) {
      const parts = filename.split('.');
      let constName = parts[0];
      for (let index = 1; index < parts.length - 1; index++) {
        constName += parts[index].charAt(0).toUpperCase() + parts[index].substring(1);
      }
      imports.push(`import ${constName} from '../src/front/config/config/${filename}';`);
      constNames.push(constName);
    }
    const contentDest = `${imports.join('\n')}\nexport default [${constNames.join(', ')}];`;
    // output
    const fileDest = path.join(configOptions.appDir, configOptions.runtimeDir, 'config.ts');
    fse.ensureFileSync(fileDest);
    fse.writeFileSync(fileDest, contentDest, 'utf-8');
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

  //import tmp from 'tmp';
  //import { build as esBuild } from 'esbuild';
  //import { pathToFileURL } from 'node:url';

  // function _pathToHref(fileName: string): string {
  //   return Path.sep === '\\' ? pathToFileURL(fileName).href : fileName;
  // }

  // async function __loadConfig(fileName: string, meta) {
  //   // temp
  //   const fileTempObj = tmp.fileSync({ postfix: '.mjs' });
  //   const fileTemp = fileTempObj.name;
  //   // build
  //   const esBuildConfig = __createEsbuildConfig(fileName, fileTemp);
  //   await esBuild(esBuildConfig as any);
  //   // load
  //   const fnResult = await import(_pathToHref(fileTemp));
  //   const configFn = fnResult.default || fnResult;
  //   const config = await configFn(meta);
  //   // delete temp
  //   fileTempObj.removeCallback();
  //   // ok
  //   return config;
  // }

  // function __createEsbuildConfig(fileSrc: string, fileDest: string) {
  //   return {
  //     platform: 'node',
  //     format: 'esm',
  //     bundle: true,
  //     packages: 'external',
  //     resolveExtensions: ['.mjs', '.js', '.mts', '.ts', '.json'],
  //     entryPoints: [fileSrc],
  //     outfile: fileDest,
  //   };
  // }
}
