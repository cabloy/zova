import { BeanCliBase, CmdOptions } from '@cabloy/cli';
import { IModuleInfo } from '@cabloy/module-info';
import path from 'path';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    componentName: string;
    componentNameShort: string;
    componentNameShortCapitalize: string;
    componentNameFull: string;
    componentNameFullCapitalize: string;
  }
}

export class CliCreateComponentBase extends BeanCliBase {
  componentMode: string;

  constructor(options: CmdOptions, componentMode) {
    super(options);
    this.componentMode = componentMode;
  }

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
    // componentName2
    const parts = componentName.split('/');
    const componentNameShort = parts[parts.length - 1];
    argv.componentNameShort = componentNameShort;
    argv.componentNameShortCapitalize = this.helper.firstCharToUpperCase(componentNameShort);
    argv.componentNameFullCapitalize = this.helper.stringToCapitalize(componentName, '/');
    argv.componentNameFull = this.helper.firstCharToLowerCase(argv.componentNameFullCapitalize);
    // directory
    let componentDir = path.join(targetDir, 'src/component');
    componentDir = path.join(componentDir, componentName);
    await this.helper.ensureDir(componentDir);
    // render snippets
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      setName: __ThisSetName__,
      snippetsPath: `create/${this.componentMode}/snippets`,
      boilerplatePath: null,
    });
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: componentDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: `create/${this.componentMode}/boilerplate`,
    });
  }
}
