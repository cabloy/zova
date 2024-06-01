import 'zova-cli';

declare module 'zova-cli' {
  export interface ICommandArgv {
    set?: string;
    group?: string;
  }
}
