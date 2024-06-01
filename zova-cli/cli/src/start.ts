import CommonBin from '@zhennann/common-bin';
import { ICommandArgv } from './types/argv.js';
import { BeanCli } from './lib/bean.cli.js';
import { CliCommand } from './lib/cli.js';
import { collectCommands } from './lib/commands.js';
const DISPATCH = Symbol.for('eb:Command#dispatch');
const PARSE = Symbol.for('eb:Command#parse');

export class CabloyCommand extends CommonBin {
  constructor(rawArgv?) {
    super(rawArgv);
    this.usage = 'Usage: zova [command] [options]';
  }

  async [DISPATCH]() {
    // collectCommands
    await collectCommands();
    // cli
    await this._handleCli();
  }

  async _handleCli() {
    // get parsed argument without handling helper and version
    const parsed = await this[PARSE](this.rawArgv);
    // argv
    const argv = {
      projectPath: process.cwd(),
    } as ICommandArgv;
    // indexCabloy
    const indexCabloy = this.rawArgv.indexOf('zova');
    // cli
    const indexCommand = indexCabloy > -1 ? indexCabloy + 1 : 0;
    Object.assign(argv, this._prepareCliFullName(parsed._[indexCommand]));
    // cli meta
    const context = { argv };
    const beanCli = new BeanCli();
    const meta = await beanCli.meta({ context });
    // cli run
    const rawArgv = this.rawArgv.slice();
    if (indexCabloy > -1) {
      rawArgv.splice(0, indexCabloy + 2);
    } else {
      rawArgv.splice(0, 1);
    }
    const command = new CliCommand(rawArgv, { meta, argv });
    await command[DISPATCH]();
    // force exit
    process.exit(0);
  }

  _prepareCliFullName(cliName) {
    if (!cliName) {
      return { cliFullName: 'core:default:list' };
      // throw new Error('Please specify the cli name');
    }
    const parts = cliName.split(':');
    if (parts.length === 1) {
      // means show module's commands
      parts[1] = '';
    }
    if (parts.length === 2) {
      if (parts[1]) {
        // means show group's commands
        parts[2] = '';
      } else {
        // means show module's commands
        if (!parts[0]) parts[0] = 'core';
        return { cliFullName: 'core:default:list', set: parts[0] };
      }
    }
    if (!parts[0]) parts[0] = 'core';
    if (!parts[1]) parts[1] = 'default';
    if (!parts[2]) {
      // means show group's commands
      return { cliFullName: 'core:default:list', set: parts[0], group: parts[1] };
    }
    // default
    return { cliFullName: parts.join(':') };
  }
}
