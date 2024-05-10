import { BeanCliBase, CmdOptions } from '@cabloy/cli';
import { IModuleInfo } from '@cabloy/module-info';
import path from 'path';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    pageName: string;
    pageNameShort: string;
    pageNameShortCapitalize: string;
    pageNameFull: string;
    pageNameFullCapitalize: string;
    pageNameParts: string[];
  }
}

export class CliCreatePageBase extends BeanCliBase {
  pageMode: string;

  constructor(options: CmdOptions, pageMode) {
    super(options);
    this.pageMode = pageMode;
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
    // pageName
    const pageName = argv.pageName;
    // pageName2
    argv.pageNameParts = pageName.split('/');
    argv.pageNameShort = argv.pageNameParts[argv.pageNameParts.length - 1];
    argv.pageNameShortCapitalize = this.helper.firstCharToUpperCase(argv.pageNameShort);
    argv.pageNameFullCapitalize = this.helper.stringToCapitalize(pageName, '/');
    argv.pageNameFull = this.helper.firstCharToLowerCase(argv.pageNameFullCapitalize);
    // directory
    let pageDir = path.join(targetDir, 'src/page');
    pageDir = path.join(pageDir, pageName);
    await this.helper.ensureDir(pageDir);
    // render snippets
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      setName: __ThisSetName__,
      snippetsPath: `create/${this.pageMode}/snippets`,
      boilerplatePath: null,
    });
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: pageDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: `create/${this.pageMode}/boilerplate`,
    });
  }
}
