import fse from 'fs-extra';
import { ConfigContext } from './types.js';

export function extendFiles(_context: ConfigContext) {
  return async function extendFiles(_conf, api) {
    const clientEntryFile = api.resolve.cli('templates/entry/client-entry.js');
    const clientEntryContent = (await fse.readFile(clientEntryFile)).toString();
    if (clientEntryContent.indexOf('quasarUserOptions.config.dark') === -1) {
      const clientEntryContentNew = clientEntryContent.replace(
        'async function start',
        `quasarUserOptions.config.dark = window.__prefersColorSchemeDark
  async function start`,
      );
      await fse.outputFile(clientEntryFile, clientEntryContentNew);
    }
  };
}
