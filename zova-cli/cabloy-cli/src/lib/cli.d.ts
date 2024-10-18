import BaseCommand from '@zhennann/common-bin';
export declare class CliCommand extends BaseCommand {
    __meta: any;
    __groups: any;
    __argv: any;
    constructor(rawArgv: any, { meta, argv }: {
        meta: any;
        argv: any;
    });
    run(options: any): Promise<void>;
    _getMetaWelcomes(): any;
    _logMetaWelcomes(): void;
    _logCliDocs(): void;
    _adjustEnv({ env }: {
        env: any;
    }): {};
    _promptGroups({ context, groups }: {
        context: any;
        groups: any;
    }): Promise<void>;
    _promptGroup({ group, context }: {
        group: any;
        context: any;
    }): Promise<void>;
    _prepareQuestionPropertyExpression({ group, question, key, context, propName }: {
        group: any;
        question: any;
        key: any;
        context: any;
        propName: any;
    }): ((value: any) => any) | null;
    _prepareQuestion({ group, question, key, context }: {
        group: any;
        question: any;
        key: any;
        context: any;
    }): any;
    _checkGroupCondition({ group, context }: {
        group: any;
        context: any;
    }): any;
}
//# sourceMappingURL=cli.d.ts.map