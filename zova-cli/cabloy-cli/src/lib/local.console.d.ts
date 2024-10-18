import { IConsoleLogData, IConsoleLogOptions } from '../types/console.js';
import { BeanCliBase } from './bean.cli.base.js';
export declare class LocalConsole {
    cli: BeanCliBase;
    constructor(cli: any);
    get options(): import("../index.js").CmdOptions;
    get context(): import("../index.js").ICommandContext;
    log(data?: IConsoleLogData | string, options?: IConsoleLogOptions): Promise<void>;
    _adjustText(prefix: any, text: any): string;
}
//# sourceMappingURL=local.console.d.ts.map