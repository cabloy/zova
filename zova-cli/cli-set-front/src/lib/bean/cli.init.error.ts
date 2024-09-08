import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.js';
import path from 'node:path';

declare module 'zova-cli' {
  interface ICommandArgv {}
}

export class CliInitError extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // module name/info
    const moduleName = argv._[0];
    if (!moduleName) return;
    argv.moduleInfo = this.helper.parseModuleInfo(moduleName);
    // check if exists
    const _module = this.helper.findModule(moduleName);
    if (!_module) {
      throw new Error(`module does not exist: ${moduleName}`);
    }
    // target dir
    const targetDir = await this.helper.ensureDir(_module.root);
    const errorFile = path.join(targetDir, 'src/config/errors.ts');
    if (fse.existsSync(errorFile)) {
      throw new Error(`error exists: ${moduleName}`);
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: path.join(targetDir, 'src'),
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'init/error/boilerplate',
    });
    // special for locale
    const localeFile = path.join(targetDir, 'src/config/locale');
    if (!fse.existsSync(localeFile)) {
      // render boilerplate
      await this.template.renderBoilerplateAndSnippets({
        targetDir: path.join(targetDir, 'src'),
        setName: __ThisSetName__,
        snippetsPath: null,
        boilerplatePath: 'init/locale/boilerplate',
      });
    }
  }
}
