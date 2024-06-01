import '@cabloy/cli';

declare module '@cabloy/cli' {
  export interface ICommandArgv {
    set?: string;
    group?: string;
  }
}
