import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.js';
import path from 'node:path';

declare module 'zova-cli' {
  interface ICommandArgv {}
}

export class CliInitIcons extends BeanCliBase {
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
    const iconsDir = path.join(targetDir, 'icons');
    if (fse.existsSync(iconsDir)) {
      throw new Error(`icons exists: ${moduleName}`);
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'init/icons/boilerplate',
    });
    // set zovaModule.capabilities.icon: true
    await this._setPackageInfo(targetDir);
    // tools.res
    await this.helper.invokeCli([':tools:res', moduleName], { cwd: argv.projectPath });
  }

  async _setPackageInfo(modulePath: string) {
    const pkgFile = path.join(modulePath, 'package.json');
    const pkgContent = (await fse.readFile(pkgFile)).toString();
    const pkg = JSON.parse(pkgContent);
    if (!pkg.zovaModule) pkg.zovaModule = {};
    if (!pkg.zovaModule.capabilities) pkg.zovaModule.capabilities = {};
    if (pkg.zovaModule.capabilities.icon) return;
    pkg.zovaModule.capabilities.icon = true;
    await fse.writeFile(pkgFile, JSON.stringify(pkg, null, 2));
  }
}
