import { CmdOptions } from 'zova-cli';
import { CliCreateComponentBase } from '../common/cliCreateComponent.js';

export class CliCreateComponent extends CliCreateComponentBase {
  constructor(options: CmdOptions) {
    super(options, 'component');
  }
}
