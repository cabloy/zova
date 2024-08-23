import { ZovaConfigMeta } from 'zova-core';
import parseArgs from 'minimist';
import path from 'node:path';

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
    const val = env[key];
    acc[`process.env.${key}`] =
      val === 'true' || val === 'false'
        ? val // let's keep it as boolean and not transform it to string
        : JSON.stringify(env[key]);
  }
  return acc;
}
