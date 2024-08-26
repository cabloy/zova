import parseArgs from 'minimist';
import path from 'node:path';
import { ZovaConfigMeta } from 'zova-shared';
import { createRequire } from 'node:module';
import moduleAlias from 'module-alias';

export function getFlavor(offset: number = 2): string {
  return getEnvFromCli('FLAVOR', 'flavor', 'admin', offset);
}

export function getAppMode(offset: number = 2): string {
  return getEnvFromCli('APPMODE', 'appMode', 'ssr', offset);
}

export function getEnvMeta(configMeta: ZovaConfigMeta) {
  return { flavor: configMeta.flavor, mode: configMeta.mode, appMode: configMeta.appMode, mine: 'mine' };
}

export function getEnvFromCli(
  cliEnvName: string,
  cliArgName: string,
  defaultValue: string,
  offset: number = 2,
): string {
  let value = process.env[cliEnvName];
  if (!value) {
    const argv = parseArgs(process.argv.slice(offset));
    value = argv[cliArgName];
  }
  if (!value) {
    value = defaultValue;
  }
  return value;
}

export function resolveTemplatePath(file: string) {
  return new URL(path.join('../templates', file), import.meta.url);
}

export function generateConfigDefine(env) {
  const acc = {};
  for (const key in env) {
    acc[`process.env.${key}`] = JSON.stringify(env[key]);
  }
  return acc;
}

export function setModuleAlias() {
  // alias
  const alias = {
    '@vue/runtime-core': __getAbsolutePathOfModule('@cabloy/vue-runtime-core'),
    '@vue/reactivity': __getAbsolutePathOfModule('@cabloy/vue-reactivity'),
    'vue-router': __getAbsolutePathOfModule('@cabloy/vue-router'),
  };
  for (const key in alias) {
    moduleAlias.addAlias(key, alias[key]);
  }
  return alias;
}

function __getAbsolutePathOfModule(id) {
  const require = createRequire(import.meta.url);
  let modulePath = require.resolve(id);
  const pos = modulePath.lastIndexOf('index.js');
  if (pos > -1) {
    modulePath = modulePath.substring(0, modulePath.length - 'index.js'.length - 1);
  }
  return modulePath;
}
