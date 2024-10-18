"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CabloyCommand = void 0;
const common_bin_1 = __importDefault(require("@zhennann/common-bin"));
const bean_cli_js_1 = require("./lib/bean.cli.js");
const cli_js_1 = require("./lib/cli.js");
const commands_js_1 = require("./lib/commands.js");
const utils_js_1 = require("./utils.js");
const DISPATCH = Symbol.for('eb:Command#dispatch');
const PARSE = Symbol.for('eb:Command#parse');
class CabloyCommand extends common_bin_1.default {
    constructor(brandName, rawArgv) {
        super(rawArgv);
        Object.defineProperty(this, "brandName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.usage = `Usage: ${brandName} [command] [options]`;
        this.brandName = brandName;
        process.env.CabloyCliBrandName = brandName;
    }
    async [DISPATCH]() {
        const parsed = await this[PARSE](this.rawArgv);
        if (parsed._.length === 0) {
            await super[DISPATCH]();
            return;
        }
        // checkForUpdates
        (0, utils_js_1.checkForUpdates)(`${this.brandName}-cli`);
        // collectCommands
        await (0, commands_js_1.collectCommands)();
        // cli
        await this._handleCli();
    }
    async _handleCli() {
        // get parsed argument without handling helper and version
        const parsed = await this[PARSE](this.rawArgv);
        // argv
        const argv = {
            projectPath: process.cwd(),
        };
        // indexBrandName
        const indexBrandName = this.rawArgv.indexOf(this.brandName);
        // cli
        const indexCommand = indexBrandName > -1 ? indexBrandName + 1 : 0;
        Object.assign(argv, this._prepareCliFullName(parsed._[indexCommand]));
        // cli meta
        const context = { argv };
        const beanCli = new bean_cli_js_1.BeanCli();
        const meta = await beanCli.meta({ context });
        // cli run
        const rawArgv = this.rawArgv.slice();
        if (indexBrandName > -1) {
            rawArgv.splice(0, indexBrandName + 2);
        }
        else {
            rawArgv.splice(0, 1);
        }
        const command = new cli_js_1.CliCommand(rawArgv, { meta, argv });
        await command[DISPATCH]();
        // force exit
        process.exit(0);
    }
    _prepareCliFullName(cliName) {
        if (!cliName) {
            return { cliFullName: 'front:default:list' };
            // throw new Error('Please specify the cli name');
        }
        const parts = cliName.split(':');
        if (parts.length === 1) {
            // means show module's commands
            parts[1] = '';
        }
        if (parts.length === 2) {
            if (parts[1]) {
                // means show group's commands
                parts[2] = '';
            }
            else {
                // means show module's commands
                if (!parts[0])
                    parts[0] = 'front';
                return { cliFullName: 'front:default:list', set: parts[0] };
            }
        }
        if (!parts[0])
            parts[0] = 'front';
        if (!parts[1])
            parts[1] = 'default';
        if (!parts[2]) {
            // means show group's commands
            return { cliFullName: 'front:default:list', set: parts[0], group: parts[1] };
        }
        // default
        return { cliFullName: parts.join(':') };
    }
}
exports.CabloyCommand = CabloyCommand;
//# sourceMappingURL=start.js.map