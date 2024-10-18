"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalHelper = void 0;
const chalk_1 = __importDefault(require("chalk"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const boxen_1 = __importDefault(require("boxen"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const ModuleInfo = __importStar(require("@cabloy/module-info"));
const process_helper_1 = require("@cabloy/process-helper");
const config_js_1 = require("../config.js");
const registry_js_1 = require("../registry.js");
const node_path_1 = __importDefault(require("node:path"));
class LocalHelper {
    constructor(cli) {
        Object.defineProperty(this, "cli", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "processHelper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cli = cli;
        this.processHelper = new process_helper_1.ProcessHelper(this.cwd, this.console);
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
        return config_js_1.commandsConfig;
    }
    get chalk() {
        return this.newChalk();
    }
    get Table() {
        return cli_table3_1.default;
    }
    get cwd() {
        return this.context.argv.projectPath;
    }
    newChalk(options) {
        if (!options) {
            options = this.moduleConfig.helper.chalk.options;
        }
        return new chalk_1.default.Instance(options);
    }
    newTable(options) {
        return new cli_table3_1.default(options);
    }
    boxen({ text, options }) {
        if (!options) {
            options = this.moduleConfig.helper.boxen.options;
        }
        return (0, boxen_1.default)(text, options);
    }
    firstCharToLowerCase(name) {
        return name.charAt(0).toLowerCase() + name.substring(1);
    }
    firstCharToUpperCase(name) {
        return name.charAt(0).toUpperCase() + name.substring(1);
    }
    stringToCapitalize(str, separator) {
        if (typeof str === 'string')
            str = str.split(separator);
        return str
            .map(name => {
            return this.firstCharToUpperCase(name);
        })
            .join('');
    }
    slashPrefixForPath(count) {
        if (count === 0)
            return './';
        return '../'.repeat(count);
    }
    parseNameMeta(name, ignores) {
        const original = name;
        const parts = original.split('/');
        const directory = parts.slice(0, parts.length - 1).join('/');
        const short = parts[parts.length - 1];
        const shortCapitalize = this.firstCharToUpperCase(short);
        let partsFull;
        if (ignores && parts.length > 1 && ignores.includes(parts[0])) {
            partsFull = parts.slice(1);
        }
        else {
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
        const moduleInfo = ModuleInfo.parseInfoPro(moduleName, process.env.CabloyCliBrandName, 'module');
        if (!moduleInfo)
            throw new Error(`module name is not valid: ${moduleName}`);
        return moduleInfo;
    }
    findModule(moduleName) {
        const moduleInfo = this.parseModuleInfo(moduleName);
        return this.cli.modulesMeta.modules[moduleInfo.relativeName];
    }
    parseSuiteInfo(suiteName) {
        const suiteInfo = ModuleInfo.parseInfoPro(suiteName, process.env.CabloyCliBrandName, 'suite');
        if (!suiteInfo)
            throw new Error(`suite name is not valid: ${suiteName}`);
        return suiteInfo;
    }
    findSuite(suiteName) {
        const suiteInfo = this.parseSuiteInfo(suiteName);
        return this.cli.modulesMeta.suites[suiteInfo.relativeName];
    }
    async ensureDir(dir) {
        await fs_extra_1.default.ensureDir(dir);
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
    async formatFile({ fileName, logPrefix }) {
        return await this.processHelper.formatFile({ fileName, logPrefix });
    }
    async spawnBin({ cmd, args, options }) {
        return await this.processHelper.spawnBin({ cmd, args, options });
    }
    async spawnCmd({ cmd, args, options }) {
        return await this.processHelper.spawnCmd({ cmd, args, options });
    }
    async spawnExe({ cmd, args, options }) {
        return await this.processHelper.spawnExe({ cmd, args, options });
    }
    async spawn({ cmd, args = [], options = {} }) {
        return await this.processHelper.spawn({ cmd, args, options });
    }
    async gitCommit({ cwd, message }) {
        return await this.processHelper.gitCommit({ cwd, message });
    }
    async getRegistry() {
        return await (0, registry_js_1.getRegistry)();
    }
    parseBrandPath() {
        const modulePath = require.resolve(`${process.env.CabloyCliBrandName}-cli/package.json`);
        return node_path_1.default.join(node_path_1.default.dirname(modulePath), `dist/bin/${process.env.CabloyCliBrandName}.js`);
    }
    async invokeCli(args, options) {
        await this.processHelper.spawnExe({
            cmd: 'node',
            args: [this.parseBrandPath()].concat(args),
            options,
        });
    }
    async loadJSONFile(fileName) {
        const pkgContent = (await fs_extra_1.default.readFile(fileName)).toString();
        return JSON.parse(pkgContent);
    }
    async saveJSONFile(fileName, json) {
        await fs_extra_1.default.writeFile(fileName, JSON.stringify(json, null, 2) + '\n');
    }
    safeSplit(str, sep = ',') {
        let left = 0;
        let start = 0;
        const result = [];
        while (start < str.length) {
            let end = start;
            while (end < str.length) {
                if (str[end] === sep && left === 0) {
                    result.push(str.substring(start, end));
                    start = end + 1;
                    break;
                }
                if (str[end] === '<')
                    left++;
                if (str[end] === '>')
                    left--;
                end++;
            }
            if (start < end) {
                result.push(str.substring(start, end));
                start = end + 1;
            }
        }
        if (start <= str.length) {
            result.push(str.substring(start, str.length));
        }
        return result;
    }
}
exports.LocalHelper = LocalHelper;
//# sourceMappingURL=local.helper.js.map