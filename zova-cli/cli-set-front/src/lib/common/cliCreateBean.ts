import { BeanCliBase, CmdOptions, NameMeta } from '@cabloy/cli';
import { IModuleInfo } from '@cabloy/module-info';
import path from 'path';
import fs from 'fs';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    sceneName: string;
    sceneNameCapitalize: string;
    beanName: string;
    nameMeta: NameMeta;
    //
    storeName: string;
    styleName: string;
    themeName: string;
    toolName: string;
    modelName: string;
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
    argv.sceneNameCapitalize = this.helper.firstCharToUpperCase(argv.sceneName);
    // bean name
    if (!argv.beanName) {
      argv.beanName = argv.storeName || argv.styleName || argv.themeName || argv.toolName || argv.modelName;
    }
    // nameMeta
    argv.nameMeta = this.helper.parseNameMeta(argv.beanName);
    // directory
    let beanDir = path.join(targetDir, 'src/bean');
    if (argv.nameMeta.directory) {
      beanDir = path.join(beanDir, argv.nameMeta.directory);
    }
    const beanFile = path.join(beanDir, `${argv.sceneName}.${argv.nameMeta.full}.ts`);
    if (fs.existsSync(beanFile)) {
      throw new Error(`${argv.sceneName} bean exists: ${argv.beanName}`);
    }
    await this.helper.ensureDir(beanDir);
    // // render snippets
    // await this.template.renderBoilerplateAndSnippets({
    //   targetDir,
    //   setName: __ThisSetName__,
    //   snippetsPath: 'create/bean/snippets',
    //   boilerplatePath: null,
    // });
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: beanDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'create/bean/boilerplate',
    });
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }
}
