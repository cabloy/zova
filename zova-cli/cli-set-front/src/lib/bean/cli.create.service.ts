import { BeanCliBase, NameMeta } from '@cabloy/cli';
import path from 'path';
import fs from 'fs';
import { IModuleInfo } from '@cabloy/module-info';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    serviceName: string;
    nameMeta: NameMeta;
  }
}

export class CliCreateService extends BeanCliBase {
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
    // serviceName
    const serviceName = argv.serviceName;
    // nameMeta
    argv.nameMeta = this.helper.parseNameMeta(serviceName, ['service']);
    // directory
    const serviceDir = path.join(targetDir, 'src/service');
    const serviceFile = path.join(serviceDir, `${serviceName}.ts`);
    if (fs.existsSync(serviceFile)) {
      throw new Error(`service exists: ${serviceFile}`);
    }
    await this.helper.ensureDir(serviceDir);
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: serviceDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'create/service/boilerplate',
    });
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }
}
