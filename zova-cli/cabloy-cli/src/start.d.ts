import CommonBin from '@zhennann/common-bin';
declare const DISPATCH: unique symbol;
export declare class CabloyCommand extends CommonBin {
    brandName: string;
    constructor(brandName: string, rawArgv?: any);
    [DISPATCH](): Promise<void>;
    _handleCli(): Promise<void>;
    _prepareCliFullName(cliName: any): {
        cliFullName: string;
        set: any;
        group?: undefined;
    } | {
        cliFullName: string;
        set: any;
        group: any;
    } | {
        cliFullName: any;
        set?: undefined;
        group?: undefined;
    };
}
export {};
//# sourceMappingURL=start.d.ts.map