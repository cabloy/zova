import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.js';
import path from 'node:path';

declare module '@cabloy/cli' {
  interface ICommandArgv {}
}

export class CliInitMonkey extends BeanCliBase {
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
    const monkeyFile = path.join(targetDir, 'src/monkey.ts');
    if (fse.existsSync(monkeyFile)) {
      throw new Error(`monkey exists: ${moduleName}`);
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: path.join(targetDir, 'src'),
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'init/monkey/boilerplate',
    });
    // set zovaModule.capabilities.monkey: true
    await this._setPackageInfo(targetDir);
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }

  async _setPackageInfo(modulePath: string) {
    const pkgFile = path.join(modulePath, 'package.json');
    const pkg = await this.helper.loadJSONFile(pkgFile);
    if (!pkg.zovaModule) pkg.zovaModule = {};
    if (!pkg.zovaModule.capabilities) pkg.zovaModule.capabilities = {};
    let changed;
    // monkey
    if (!pkg.zovaModule.capabilities.monkey) {
      pkg.zovaModule.capabilities.monkey = true;
      changed = true;
    }
    // dependencies
    if (!pkg.zovaModule.dependencies) pkg.zovaModule.dependencies = {};
    if (!pkg.zovaModule.dependencies['a-zova']) {
      pkg.zovaModule.dependencies['a-zova'] = '5.0.0';
      changed = true;
    }
    // save
    if (changed) {
      await this.helper.saveJSONFile(pkgFile, pkg);
    }
  }
}
