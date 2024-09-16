import { BeanCliBase, NameMeta } from 'zova-cli';
import path from 'path';
import fs from 'fs';
import { IModuleInfo } from '@cabloy/module-info';
import { __ThisSetName__ } from '../this.js';

declare module 'zova-cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    pageName: string;
    nameMeta: NameMeta;
  }
}

export class CliRefactorPageQuery extends BeanCliBase {
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
    // pageName
    const pageName = argv.pageName;
    // nameMeta
    argv.nameMeta = this.helper.parseNameMeta(pageName, ['page']);
    // directory
    const pageDir = path.join(targetDir, 'src/page', argv.nameMeta.short);
    if (!fs.existsSync(pageDir)) {
      throw new Error(`page not exists: ${pageDir}`);
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: pageDir,
      setName: __ThisSetName__,
      snippetsPath: 'refactor/pageQuery/snippets',
      boilerplatePath: null,
    });
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }
}
