import { CabloyConfigMeta } from '@cabloy/front-core';
import parseArgs from 'minimist';

export function getFlavor(offset: number = 2) {
  const argv = parseArgs(process.argv.slice(offset));
  return argv.flavor || 'web';
}

export function getEnvMeta(configMeta: CabloyConfigMeta) {
  return { flavor: configMeta.flavor, mode: configMeta.mode, appMode: configMeta.appMode, mine: 'mine' };
}
