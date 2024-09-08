import { BeanCliBase, CmdOptions, NameMeta } from 'zova-cli';
import { IModuleInfo } from '@cabloy/module-info';
import path from 'path';
import fs from 'fs';
import { __ThisSetName__ } from '../this.js';
import { createConfigUtils } from 'zova-vite';
import { ZovaConfigMeta } from 'zova-shared';

declare module 'zova-cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    pageName: string;
    nameMeta: NameMeta;
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
    // nameMeta
    argv.nameMeta = this.helper.parseNameMeta(pageName);
    // directory
    let pageDir = path.join(targetDir, 'src/page');
    pageDir = path.join(pageDir, pageName);
    if (fs.existsSync(pageDir)) {
      throw new Error(`page exists: ${pageName}`);
    }
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
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
    // log url
    await this.logUrl(argv);
  }

  async logUrl(argv) {
    const env = await this.loadEnvs();
    const host = !env.DEV_SERVER_HOST || env.DEV_SERVER_HOST === 'true' ? 'localhost' : env.DEV_SERVER_HOST;
    const port = env.DEV_SERVER_PORT;
    const url = `http://${host}:${port}/#/${argv.moduleInfo.pid}/${argv.moduleInfo.name}/${argv.pageName}`;
    const message = this.helper.boxen({ text: url });
    await this.console.log(message);
  }

  async loadEnvs() {
    const configMeta: ZovaConfigMeta = {
      flavor: 'app',
      mode: 'development',
      appMode: 'spa',
    };
    const configOptions = {
      appDir: process.cwd(),
      runtimeDir: '.zova',
      zovaManualChunk: {
        debug: false,
        vendors: [],
      },
    };
    // config utils
    const configUtils = createConfigUtils(configMeta, configOptions);
    // env
    const env = configUtils.loadEnvs();
    return env;
  }
}
