import Chalk from 'chalk';
import TableClass, { TableConstructorOptions } from 'cli-table3';
import Boxen from 'boxen';
import fse from 'fs-extra';
import * as ModuleInfo from '@cabloy/module-info';
import { ProcessHelper } from '@cabloy/process-helper';
import { commandsConfig } from '../config.js';
import { BeanCliBase } from './bean.cli.base.js';

export class LocalHelper {
  cli: BeanCliBase;
  ProcessHelper: any;

  constructor(cli) {
    this.cli = cli;
    this.ProcessHelper = new ProcessHelper(this.cwd, this.console as any);
  }

  get options() {
    return this.cli.options;
  }

  get context() {
    return this.cli.options.context;
  }

  get console() {
    return this.cli.console;
  }

  get template() {
    return this.cli.template;
  }

  get moduleConfig() {
    return commandsConfig;
  }
  get chalk() {
    return this.newChalk();
  }
  get Table() {
    return TableClass;
  }
  get cwd() {
    return this.context.argv.projectPath;
  }

  newChalk(options?) {
    if (!options) {
      options = this.moduleConfig.helper.chalk.options;
    }
    return new Chalk.Instance(options);
  }
  newTable(options: TableConstructorOptions) {
    return new TableClass(options);
  }
  boxen({ text, options }: any) {
    if (!options) {
      options = this.moduleConfig.helper.boxen.options;
    }
    return Boxen(text, options);
  }
  firstCharToLowerCase(name: string) {
    return name.charAt(0).toLowerCase() + name.substring(1);
  }
  firstCharToUpperCase(name: string) {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }
  stringToCapitalize(str: string, separator: string): string {
    return str
      .split(separator)
      .map(name => {
        return this.firstCharToUpperCase(name);
      })
      .join('');
  }
  parseModuleInfo(moduleName) {
    const moduleInfo = ModuleInfo.parseInfoPro(moduleName, 'api', 'module');
    if (!moduleInfo) throw new Error(`module name is not valid: ${moduleName}`);
    return moduleInfo;
  }
  findModule(moduleName) {
    const moduleInfo = this.parseModuleInfo(moduleName);
    return this.cli.modulesMeta.modules[moduleInfo.relativeName];
  }
  parseSuiteInfo(suiteName) {
    const suiteInfo = ModuleInfo.parseInfoPro(suiteName, 'api', 'suite');
    if (!suiteInfo) throw new Error(`suite name is not valid: ${suiteName}`);
    return suiteInfo;
  }
  findSuite(suiteName) {
    const suiteInfo = this.parseSuiteInfo(suiteName);
    return this.cli.modulesMeta.suites[suiteInfo.relativeName];
  }
  async ensureDir(dir) {
    await fse.ensureDir(dir);
    return dir;
  }
  async pnpmInstall() {
    // args
    const args = ['install', '--force'];
    // log
    await this.console.log('===> pnpm install --force');
    // spawn
    await this.spawnCmd({
      cmd: 'pnpm',
      args,
    });
  }
  async formatFile({ fileName, logPrefix }: any) {
    return await this.ProcessHelper.formatFile({ fileName, logPrefix });
  }
  async spawnBin({ cmd, args, options }: any) {
    return await this.ProcessHelper.spawnBin({ cmd, args, options });
  }
  async spawnCmd({ cmd, args, options }: any) {
    return await this.ProcessHelper.spawnCmd({ cmd, args, options });
  }
  async spawnExe({ cmd, args, options }: any) {
    return await this.ProcessHelper.spawnExe({ cmd, args, options });
  }
  async spawn({ cmd, args = [], options = {} }) {
    return await this.ProcessHelper.spawn({ cmd, args, options });
  }
  async gitCommit({ cwd, message }: any) {
    return await this.ProcessHelper.gitCommit({ cwd, message });
  }
}
