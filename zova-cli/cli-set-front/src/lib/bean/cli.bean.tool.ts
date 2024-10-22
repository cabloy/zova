import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliBeanTool extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'tool');
  }
}
