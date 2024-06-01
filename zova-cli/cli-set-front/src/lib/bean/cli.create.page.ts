import { CmdOptions } from 'zova-cli';
import { CliCreatePageBase } from '../common/cliCreatePage.js';

export class CliCreatePage extends CliCreatePageBase {
  constructor(options: CmdOptions) {
    super(options, 'page');
  }
}
