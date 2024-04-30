import { ICommandContext } from '../types/argv.js';
import { findCommand } from './commands.js';

export class BeanCli {
  async meta({ context }: { context: ICommandContext }) {
    // command
    const { argv } = context;
    const cliFullName = argv.cliFullName;
    const { command, BeanClass } = await this._findCliCommand({ cliFullName });
    // command bean
    const beanCommand = new BeanClass({ command, context, terminal: false });
    if (!beanCommand) throw new Error(`cli command bean not found: ${command.beanFullName}`);
    // meta
    return await beanCommand.meta();
  }

  async execute({ context }: { context: ICommandContext }) {
    // command
    const { argv } = context;
    const cliFullName = argv.cliFullName;
    const { command, BeanClass } = await this._findCliCommand({ cliFullName });
    // command bean
    const beanCommand = new BeanClass({ command, context, terminal: false });
    if (!beanCommand) throw new Error(`cli command bean not found: ${command.beanFullName}`);
    // execute
    await beanCommand.execute();
  }

  _findCliCommand({ cliFullName }: { cliFullName: string }) {
    const { command, BeanClass } = findCommand(cliFullName);
    if (!command) throw new Error(`cli command not found: ${cliFullName}`);
    return { command, BeanClass };
  }
}
