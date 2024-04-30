import { BeanCliBase, CmdOptions } from '@cabloy/cli';
import { IModuleInfo } from '@cabloy/module-info';
import path from 'path';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    sceneName: string;
    sceneNameCapitalize: string;
    beanName: string;
    beanNameCapitalize: string;
    //
    storeName: string;
  }
}

export class CliCreateBeanBase extends BeanCliBase {
  sceneName: string;

  constructor(options: CmdOptions, sceneName) {
    super(options);
    this.sceneName = sceneName;
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
    // scene name
    if (!argv.sceneName) {
      argv.sceneName = this.sceneName;
    }
    argv.sceneNameCapitalize = this.helper.firstCharToCapitalize(argv.sceneName);
    // bean name
    if (!argv.beanName) {
      argv.beanName = argv.storeName;
    }
    argv.beanNameCapitalize = this.helper.firstCharToCapitalize(argv.beanName);
    // directory
    const beanDir = path.join(targetDir, 'src/bean');
    await this.helper.ensureDir(beanDir);
    // render snippets
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      setName: __ThisSetName__,
      snippetsPath: `create/${this.sceneName}/snippets`,
      boilerplatePath: null,
    });
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: beanDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: `create/${this.sceneName}/boilerplate`,
    });
  }
}
