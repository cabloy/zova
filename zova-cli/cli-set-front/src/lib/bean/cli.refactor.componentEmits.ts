import { BeanCliBase, NameMeta } from '@cabloy/cli';
import path from 'path';
import fs from 'fs';
import { IModuleInfo } from '@cabloy/module-info';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    componentName: string;
    nameMeta: NameMeta;
  }
}

export class CliRefactorComponentEmits extends BeanCliBase {
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
    // componentName
    const componentName = argv.componentName;
    // nameMeta
    argv.nameMeta = this.helper.parseNameMeta(componentName, ['component']);
    // directory
    const componentDir = path.join(targetDir, 'src/component', argv.nameMeta.short);
    if (!fs.existsSync(componentDir)) {
      throw new Error(`component not exists: ${componentDir}`);
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: componentDir,
      setName: __ThisSetName__,
      snippetsPath: 'refactor/componentEmits/snippets',
      boilerplatePath: null,
    });
    // // tools.metadata
    // await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }
}
