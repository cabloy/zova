import { ICommandContext } from '../types/argv.js';
export declare class BeanCli {
    meta({ context }: {
        context: ICommandContext;
    }): Promise<any>;
    execute({ context }: {
        context: ICommandContext;
    }): Promise<void>;
    _findCliCommand({ cliFullName }: {
        cliFullName: string;
    }): {
        command: any;
        BeanClass: any;
    };
}
//# sourceMappingURL=bean.cli.d.ts.map