import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import path from 'path';

declare module 'zova-cli' {
  interface ICommandArgv {}
}

export class CliToolsRes extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const moduleNames = argv._;
    const total = moduleNames.length;
    for (let index = 0; index < total; index++) {
      const moduleName = moduleNames[index];
      // log
      await this.console.log({
        total,
        progress: index,
        text: moduleName,
      });
      // generate
      await this._generateRes(moduleName);
    }
  }

  async _generateRes(moduleName: string) {
    const module = this.helper.findModule(moduleName);
    if (!module) throw new Error(`module not found: ${moduleName}`);
    const modulePath = module.root;
    const resDest = path.join(modulePath, '.res/index.ts');
    await fse.writeFile(resDest, 'export {}');
  }
}
