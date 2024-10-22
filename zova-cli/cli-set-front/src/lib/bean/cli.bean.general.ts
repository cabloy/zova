import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliBeanGeneral extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'bean');
  }
}
