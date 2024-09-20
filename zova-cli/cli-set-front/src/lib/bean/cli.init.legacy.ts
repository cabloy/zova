import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.js';
import path from 'node:path';

declare module 'zova-cli' {
  interface ICommandArgv {}
}

export class CliInitLegacy extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // target dir
    const legacyDir = path.join(argv.projectPath, 'src/legacy');
    if (fse.existsSync(legacyDir)) {
      throw new Error(`legacy exists: ${legacyDir}`);
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: legacyDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'init/legacy/boilerplate',
    });
  }
}
