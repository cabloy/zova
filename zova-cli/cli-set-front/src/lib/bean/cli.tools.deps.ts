import { BeanCliBase } from 'zova-cli';

declare module 'zova-cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliToolsDeps extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // generate original
    await this._generateOriginal(projectPath);
  }

  async _generateOriginal(projectPath: string) {
    this.console.log(projectPath);
  }
}
