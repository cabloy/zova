import { CabloyCommand } from '@cabloy/cli';

export class ZovaCommand extends CabloyCommand {
  constructor(rawArgv?) {
    super(rawArgv);
    this.usage = 'Usage: zova [command] [options]';
    this.brandName = 'zova';
  }
}
