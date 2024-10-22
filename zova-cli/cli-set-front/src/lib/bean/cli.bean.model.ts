import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliBeanModel extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'model');
  }
}
