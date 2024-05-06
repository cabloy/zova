import { CabloyConfigMeta } from '@cabloy/front-core';
import parseArgs from 'minimist';

export function getFlavor(offset: number = 2): string {
  let flavor = process.env.FLAVOR;
  if (!flavor) {
    const argv = parseArgs(process.argv.slice(offset));
    flavor = argv.flavor;
  }
  if (!flavor) {
    flavor = 'web';
  }
  return flavor;
}

export function getEnvMeta(configMeta: CabloyConfigMeta) {
  return { flavor: configMeta.flavor, mode: configMeta.mode, appMode: configMeta.appMode, mine: 'mine' };
}
