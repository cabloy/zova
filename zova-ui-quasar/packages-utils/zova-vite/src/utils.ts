import { ZovaConfigMeta } from 'zova-core';
import parseArgs from 'minimist';

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
