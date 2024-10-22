import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliBeanStyle extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'style');
  }
}
