import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliBeanTheme extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'theme');
  }
}
