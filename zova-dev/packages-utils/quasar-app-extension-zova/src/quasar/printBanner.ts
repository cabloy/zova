import { ConfigContext } from './types.js';
import { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import { IndexAPI } from '@quasar/app-vite';
import chalk from 'chalk';

export function printBanner(_context: ConfigContext, flavor: string) {
  return async function printBanner(_conf: QuasarConf, api: IndexAPI) {
    const mode = api.ctx.prod ? 'production' : 'development';
    const appMode = api.ctx.modeName;
    // log
    setTimeout(() => {
      _print(mode, appMode);
    }, 3000);
  };

  function _print(mode: string, appMode: string) {
    console.log(chalk.yellow('\n============ Zova Meta ============'));
    console.log('vite mode ......... ' + chalk.cyan(mode));
    console.log('app mode .......... ' + chalk.cyan(appMode));
    console.log('flavor ............ ' + chalk.cyan(flavor));
    console.log('\n');
  }
}
