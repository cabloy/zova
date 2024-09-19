export interface ICommandArgv {
  // [Prop: string]: any;
  projectPath: string;
  cliFullName: string;
  vscode: boolean;
  cicd: boolean;
  _: string[];
}

export interface ICommandContext {
  argv: ICommandArgv;
}

export interface CmdOptions {
  command: CmdCommand;
  context: ICommandContext;
  terminal: boolean;
}

export interface CmdCommand {
  bean: string;
  info: {
    version: string;
    title: string;
  };
  options: object;
  groups: object | null;
}
