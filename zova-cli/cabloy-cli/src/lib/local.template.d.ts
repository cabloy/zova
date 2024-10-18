import { BeanCliBase } from './bean.cli.base.js';
export declare class LocalTemplate {
    cli: BeanCliBase;
    constructor(cli: any);
    get options(): import("../index.js").CmdOptions;
    get context(): import("../index.js").ICommandContext;
    get console(): import("./local.console.js").LocalConsole;
    get helper(): import("./local.helper.js").LocalHelper;
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
    get fileMapping(): {
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
    get filesIgnore(): string[];
    resolveTemplatePath({ setName, path: _path }: any): string;
    renderBoilerplateAndSnippets({ targetDir, setName, snippetsPath, boilerplatePath }: any): Promise<void>;
    renderDir({ targetDir, templateDir }: any): Promise<any>;
    replaceTemplate(content: any, scope: any): any;
    getProperty(obj: any, name: any, sep?: any): any;
    _getProperty(obj: any, name: any, sep: any, forceObject: any): any;
    parseFileBaseName(basename: any): any;
    renderFile({ targetFile, templateFile }: any): Promise<void>;
    renderContent({ content }: any): Promise<any>;
    getEjsOptions(): {
        async: boolean;
        cache: boolean;
        compileDebug: boolean;
        outputFunctionName: string;
        rmWhitespace: boolean;
    };
    getEjsData(): {
        argv: import("../index.js").ICommandArgv;
        cli: BeanCliBase;
    };
    getAstData(ast: any, snippet: any): {
        argv: import("../index.js").ICommandArgv;
        cli: BeanCliBase;
        ast: any;
        snippet: any;
    };
    applySnippets({ targetDir, snippetsDir }: any): Promise<void>;
    applySnippet({ targetFile, snippet }: any): Promise<void>;
    _parseSnippetFilePrefix(fileName: any): number;
    requireDynamic(file: any): any;
    private _requireDynamic_getFileTime;
}
//# sourceMappingURL=local.template.d.ts.map