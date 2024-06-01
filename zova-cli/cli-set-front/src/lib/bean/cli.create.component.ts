import { CmdOptions } from '@cabloy/cli';
import { CliCreateComponentBase } from '../common/cliCreateComponent.js';

export class CliCreateComponent extends CliCreateComponentBase {
  constructor(options: CmdOptions) {
    super(options, 'component');
  }
}
