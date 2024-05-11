import { BeanCliBase, NameMeta } from '@cabloy/cli';
import path from 'path';
import { IModuleInfo } from '@cabloy/module-info';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    localName: string;
    nameMeta: NameMeta;
  }
}

export class CliCreateLocal extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // module name/info
    const moduleName = argv.module;
    argv.moduleInfo = this.helper.parseModuleInfo(moduleName);
    // check if exists
    const _module = this.helper.findModule(moduleName);
    if (!_module) {
      throw new Error(`module does not exist: ${moduleName}`);
    }
    // target dir
    const targetDir = await this.helper.ensureDir(_module.root);
    // localName
    const localName = argv.localName;
    // nameMeta
    argv.nameMeta = this.helper.parseNameMeta(localName);
    // directory
    let localDir = path.join(targetDir, 'src');
    if (argv.nameMeta.directory) {
      localDir = path.join(localDir, argv.nameMeta.directory);
    }
    await this.helper.ensureDir(localDir);
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: localDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'create/local/boilerplate',
    });
  }
}
