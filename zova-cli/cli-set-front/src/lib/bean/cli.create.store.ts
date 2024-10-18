import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateStore extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'store');
  }
}
