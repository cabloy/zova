import { glob } from '@cabloy/module-glob';
import { LocalConsole } from './local.console.js';
import { LocalHelper } from './local.helper.js';
import { LocalTemplate } from './local.template.js';
import { CmdOptions } from '../types/argv.js';
export declare class BeanCliBase {
    options: CmdOptions;
    terminal: any;
    __console: LocalConsole;
    __helper: LocalHelper;
    __template: LocalTemplate;
    modulesMeta: Awaited<ReturnType<typeof glob>>;
    constructor(options: CmdOptions);
    get console(): LocalConsole;
    get helper(): LocalHelper;
    get template(): LocalTemplate;
    get context(): import("../types/argv.js").ICommandContext;
    get cliFullName(): string;
    meta(): Promise<any>;
    execute(): Promise<any>;
    _loadModulesMeta(): Promise<void>;
    _commandMeta(): any;
    _commandMeta_groups({ groups }: any): any;
    _commandMeta_group({ group }: any): {
        description: any;
        condition: any;
        questions: {};
    };
    _commandMeta_options({ options }: any): any;
    _commandMeta_info({ info, argv }: any): any;
    _commandMeta_info_welcomes({ info }: any): any;
}
//# sourceMappingURL=bean.cli.base.d.ts.map