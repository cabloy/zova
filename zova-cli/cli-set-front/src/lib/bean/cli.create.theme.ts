import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateTheme extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'theme');
  }
}
