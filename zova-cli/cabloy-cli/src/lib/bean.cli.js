"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanCli = void 0;
const commands_js_1 = require("./commands.js");
class BeanCli {
    async meta({ context }) {
        // command
        const { argv } = context;
        const cliFullName = argv.cliFullName;
        const { command, BeanClass } = await this._findCliCommand({ cliFullName });
        // command bean
        const beanCommand = new BeanClass({ command, context, terminal: false });
        if (!beanCommand)
            throw new Error(`cli command bean not found: ${command.beanFullName}`);
        // meta
        return await beanCommand.meta();
    }
    async execute({ context }) {
        // command
        const { argv } = context;
        const cliFullName = argv.cliFullName;
        const { command, BeanClass } = await this._findCliCommand({ cliFullName });
        // command bean
        const beanCommand = new BeanClass({ command, context, terminal: false });
        if (!beanCommand)
            throw new Error(`cli command bean not found: ${command.beanFullName}`);
        // execute
        await beanCommand.execute();
    }
    _findCliCommand({ cliFullName }) {
        const { command, BeanClass } = (0, commands_js_1.findCommand)(cliFullName);
        if (!command)
            throw new Error(`cli command not found: ${cliFullName}`);
        return { command, BeanClass };
    }
}
exports.BeanCli = BeanCli;
//# sourceMappingURL=bean.cli.js.map