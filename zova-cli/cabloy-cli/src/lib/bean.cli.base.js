"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanCliBase = void 0;
const module_glob_1 = require("@cabloy/module-glob");
const local_console_js_1 = require("./local.console.js");
const local_helper_js_1 = require("./local.helper.js");
const local_template_js_1 = require("./local.template.js");
class BeanCliBase {
    constructor(options) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "terminal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "__console", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "__helper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "__template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modulesMeta", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.options = options;
        this.terminal = options.terminal !== false;
    }
    get console() {
        if (!this.__console) {
            this.__console = new local_console_js_1.LocalConsole(this);
        }
        return this.__console;
    }
    get helper() {
        if (!this.__helper) {
            this.__helper = new local_helper_js_1.LocalHelper(this);
        }
        return this.__helper;
    }
    get template() {
        if (!this.__template) {
            this.__template = new local_template_js_1.LocalTemplate(this);
        }
        return this.__template;
    }
    get context() {
        return this.options.context;
    }
    get cliFullName() {
        return this.options.context.argv.cliFullName;
    }
    async meta() {
        await this._loadModulesMeta();
        const metaLocale = this._commandMeta();
        return metaLocale;
    }
    async execute() {
        await this._loadModulesMeta();
    }
    async _loadModulesMeta() {
        //
        if (this.modulesMeta)
            return;
        // all modules
        this.modulesMeta = await (0, module_glob_1.glob)({
            projectPath: this.context.argv.projectPath,
            disabledModules: undefined,
            disabledSuites: undefined,
            log: false,
            projectMode: process.env.CabloyCliBrandName,
        });
    }
    _commandMeta() {
        const { command } = this.options;
        const { argv } = this.context;
        const meta = {};
        meta.info = this._commandMeta_info({ info: command.info, argv });
        meta.options = this._commandMeta_options({ options: command.options, argv });
        meta.groups = this._commandMeta_groups({ groups: command.groups, argv });
        return meta;
    }
    _commandMeta_groups({ groups }) {
        const metaGroups = {};
        if (groups) {
            for (const groupName in groups) {
                const group = groups[groupName];
                metaGroups[groupName] = this._commandMeta_group({ group });
            }
        }
        return metaGroups;
    }
    _commandMeta_group({ group }) {
        const metaGroup = {
            description: group.description,
            condition: group.condition,
            questions: {},
        };
        for (const key in group.questions) {
            const question = group.questions[key];
            metaGroup.questions[key] = {
                ...question,
                message: question.message,
            };
        }
        return metaGroup;
    }
    _commandMeta_options({ options }) {
        const metaOptions = {};
        if (options) {
            for (const key in options) {
                const option = options[key];
                metaOptions[key] = {
                    ...option,
                    description: option.description,
                };
            }
        }
        return metaOptions;
    }
    _commandMeta_info({ info, argv }) {
        // info
        const metaInfo = {
            version: info.version,
            title: info.title,
            usage: info.usage,
        };
        // usage
        if (!metaInfo.usage) {
            metaInfo.usage = `${'Usage'}: ${process.env.CabloyCliBrandName} ${argv.cliFullName} [options] [-h] [-v]`;
        }
        // welcomes
        metaInfo.welcomes = this._commandMeta_info_welcomes({ info });
        // ok
        return metaInfo;
    }
    _commandMeta_info_welcomes({ info }) {
        let welcomes = info.welcomes || [];
        if (!Array.isArray(welcomes))
            welcomes = [welcomes];
        welcomes = welcomes.map(item => item);
        return welcomes;
    }
}
exports.BeanCliBase = BeanCliBase;
//# sourceMappingURL=bean.cli.base.js.map