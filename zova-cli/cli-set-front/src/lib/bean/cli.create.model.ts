import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateModel extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'model');
  }
}
