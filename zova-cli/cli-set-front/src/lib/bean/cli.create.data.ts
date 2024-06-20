import { CmdOptions } from 'zova-cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateData extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'data');
  }
}
