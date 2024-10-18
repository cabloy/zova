import Chalk from 'chalk';
import TableClass, { TableConstructorOptions } from 'cli-table3';
import * as ModuleInfo from '@cabloy/module-info';
import { BeanCliBase } from './bean.cli.base.js';
import { NameMeta } from '../types/helper.js';
export declare class LocalHelper {
    cli: BeanCliBase;
    processHelper: any;
    constructor(cli: any);
    get options(): import("../index.js").CmdOptions;
    get context(): import("../index.js").ICommandContext;
    get console(): import("./local.console.js").LocalConsole;
    get template(): import("./local.template.js").LocalTemplate;
    get moduleConfig(): {
        sets: {};
        helper: {
            chalk: {
                options: {
                    level: number;
                };
            };
            boxen: {
                options: {
                    padding: number;
                    margin: number;
                    align: string;
                    borderColor: string;
                    borderStyle: string;
                };
            };
        };
        template: {
            render: {
                fileMapping: {
                    gitignore: string;
                    _gitignore: string;
                    '_.gitignore': string;
                    '_package.json': string;
                    '_.eslintrc': string;
                    '_.eslintignore': string;
                    '_.npmignore': string;
                    '_.npmrc': string;
                    '_.eslintrc.js': string;
                    '_jsconfig.json': string;
                    '_tsconfig.json': string;
                    '_tsconfig.base.json': string;
                    '_tsconfig.build.json': string;
                };
                ignore: string[];
            };
        };
    };
    get chalk(): Chalk.Chalk;
    get Table(): TableClass;
    get cwd(): string;
    newChalk(options?: any): Chalk.Chalk;
    newTable(options: TableConstructorOptions): TableClass.Table;
    boxen({ text, options }: any): string;
    firstCharToLowerCase(name: string): string;
    firstCharToUpperCase(name: string): string;
    stringToCapitalize(str: string[] | string, separator: string): string;
    slashPrefixForPath(count: number): string;
    parseNameMeta(name: string, ignores?: string[]): NameMeta;
    parseModuleInfo(moduleName: any): ModuleInfo.IModuleInfo;
    findModule(moduleName: any): ModuleInfo.IModule;
    parseSuiteInfo(suiteName: any): ModuleInfo.IModuleInfo;
    findSuite(suiteName: any): ModuleInfo.ISuite;
    ensureDir(dir: any): Promise<any>;
    pnpmInstall(): Promise<void>;
    formatFile({ fileName, logPrefix }: any): Promise<any>;
    spawnBin({ cmd, args, options }: any): Promise<any>;
    spawnCmd({ cmd, args, options }: any): Promise<any>;
    spawnExe({ cmd, args, options }: any): Promise<any>;
    spawn({ cmd, args, options }: {
        cmd: any;
        args?: never[] | undefined;
        options?: {} | undefined;
    }): Promise<any>;
    gitCommit({ cwd, message }: any): Promise<any>;
    getRegistry(): Promise<string>;
    parseBrandPath(): string;
    invokeCli(args: string[], options: any): Promise<void>;
    loadJSONFile(fileName: string): Promise<any>;
    saveJSONFile(fileName: string, json: object): Promise<void>;
    safeSplit(str: string, sep?: string): string[];
}
//# sourceMappingURL=local.helper.d.ts.map