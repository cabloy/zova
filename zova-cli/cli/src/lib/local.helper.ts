import Chalk from 'chalk';
import TableClass, { TableConstructorOptions } from 'cli-table3';
import Boxen from 'boxen';
import fse from 'fs-extra';
import * as ModuleInfo from '@cabloy/module-info';
import { ProcessHelper } from '@cabloy/process-helper';
import { commandsConfig } from '../config.js';
import { BeanCliBase } from './bean.cli.base.js';
import { NameMeta } from '../types/helper.js';
import { getRegistry } from '../registry.js';
import path from 'node:path';

export class LocalHelper {
  cli: BeanCliBase;
  processHelper: any;

  constructor(cli) {
    this.cli = cli;
    this.processHelper = new ProcessHelper(this.cwd, this.console as any);
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
  stringToCapitalize(str: string[] | string, separator: string): string {
    if (typeof str === 'string') str = str.split(separator);
    return str
      .map(name => {
        return this.firstCharToUpperCase(name);
      })
      .join('');
  }
  slashPrefixForPath(count: number) {
    if (count === 0) return './';
    return '../'.repeat(count);
  }
  parseNameMeta(name: string, ignores?: string[]): NameMeta {
    const original = name;
    const parts = original.split('/');
    const directory = parts.slice(0, parts.length - 1).join('/');
    const short = parts[parts.length - 1];
    const shortCapitalize = this.firstCharToUpperCase(short);
    let partsFull;
    if (ignores && parts.length > 1 && ignores.includes(parts[0])) {
      partsFull = parts.slice(1);
    } else {
      partsFull = parts;
    }
    if (partsFull.length > 1 && partsFull[0] === partsFull[1]) {
      partsFull = partsFull.slice(1);
    }
    const fullCapitalize = this.stringToCapitalize(partsFull, '/');
    const full = this.firstCharToLowerCase(fullCapitalize);
    return {
      original,
      parts,
      directory,
      short,
      shortCapitalize,
      full,
      fullCapitalize,
    };
  }
  parseModuleInfo(moduleName) {
    const moduleInfo = ModuleInfo.parseInfoPro(moduleName, 'zova', 'module');
    if (!moduleInfo) throw new Error(`module name is not valid: ${moduleName}`);
    return moduleInfo;
  }
  findModule(moduleName) {
    const moduleInfo = this.parseModuleInfo(moduleName);
    return this.cli.modulesMeta.modules[moduleInfo.relativeName];
  }
  parseSuiteInfo(suiteName) {
    const suiteInfo = ModuleInfo.parseInfoPro(suiteName, 'zova', 'suite');
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
    return await this.processHelper.formatFile({ fileName, logPrefix });
  }
  async spawnBin({ cmd, args, options }: any) {
    return await this.processHelper.spawnBin({ cmd, args, options });
  }
  async spawnCmd({ cmd, args, options }: any) {
    return await this.processHelper.spawnCmd({ cmd, args, options });
  }
  async spawnExe({ cmd, args, options }: any) {
    return await this.processHelper.spawnExe({ cmd, args, options });
  }
  async spawn({ cmd, args = [], options = {} }) {
    return await this.processHelper.spawn({ cmd, args, options });
  }
  async gitCommit({ cwd, message }: any) {
    return await this.processHelper.gitCommit({ cwd, message });
  }
  async getRegistry() {
    return await getRegistry();
  }
  async invokeCli(args: string[], options) {
    await this.processHelper.spawnExe({
      cmd: 'node',
      args: [path.join(__dirname, '../../dist/bin/zova.js')].concat(args),
      options,
    });
  }
  async loadJSONFile(fileName: string) {
    const pkgContent = (await fse.readFile(fileName)).toString();
    return JSON.parse(pkgContent);
  }
  async saveJSONFile(fileName: string, json: object) {
    await fse.writeFile(fileName, JSON.stringify(json, null, 2) + '\n');
  }
}
