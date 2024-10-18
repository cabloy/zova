"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const egg_born_utils_1 = __importDefault(require("egg-born-utils"));
const istextorbinary_1 = __importDefault(require("istextorbinary"));
const ejs_1 = __importDefault(require("@zhennann/ejs"));
const gogocode_1 = __importDefault(require("gogocode"));
const config_js_1 = require("../config.js");
class LocalTemplate {
    constructor(cli) {
        Object.defineProperty(this, "cli", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cli = cli;
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
    get helper() {
        return this.cli.helper;
    }
    get moduleConfig() {
        return config_js_1.commandsConfig;
    }
    get fileMapping() {
        return this.moduleConfig.template.render.fileMapping;
    }
    get filesIgnore() {
        return this.moduleConfig.template.render.ignore;
    }
    resolveTemplatePath({ setName, path: _path }) {
        const sets = this.moduleConfig.sets;
        const modulePath = require.resolve(`${sets[process.env.CabloyCliBrandName][setName]}/package.json`);
        return path_1.default.join(path_1.default.dirname(modulePath), 'cli/templates', _path);
    }
    async renderBoilerplateAndSnippets({ targetDir, setName, snippetsPath, boilerplatePath }) {
        // first
        if (snippetsPath) {
            const snippetsDir = this.resolveTemplatePath({
                setName,
                path: snippetsPath,
            });
            await this.applySnippets({ targetDir, snippetsDir });
        }
        // then
        if (boilerplatePath) {
            const templateDir = this.resolveTemplatePath({
                setName,
                path: boilerplatePath,
            });
            await this.renderDir({ targetDir, templateDir });
        }
    }
    async renderDir({ targetDir, templateDir }) {
        const { argv } = this.context;
        // files
        const files = egg_born_utils_1.default.tools.globbySync('**/*', {
            cwd: templateDir,
            dot: true,
            onlyFiles: false,
            followSymlinkedDirectories: false,
        });
        // loop
        for (const file of files) {
            const { dir: dirname, base: basename } = path_1.default.parse(file);
            if (this.filesIgnore.includes(basename))
                continue;
            const templateFile = path_1.default.join(templateDir, file);
            const fileName = this.parseFileBaseName(basename);
            const parentPath = path_1.default.join(targetDir, dirname);
            const targetFile = path_1.default.join(parentPath, this.replaceTemplate(fileName, argv));
            await this.renderFile({ targetFile, templateFile });
            if (fileName !== '.gitkeep') {
                const gitkeep = path_1.default.join(parentPath, '.gitkeep');
                if (fs_1.default.existsSync(gitkeep)) {
                    fs_1.default.unlinkSync(gitkeep);
                }
            }
        }
        return files;
    }
    replaceTemplate(content, scope) {
        if (!content)
            return null;
        return content.toString().replace(/(\\)?{{ *([\w\.]+) *}}/g, (block, skip, key) => {
            if (skip) {
                return block.substring(skip.length);
            }
            const value = this.getProperty(scope, key);
            return value !== undefined ? value : '';
        });
    }
    getProperty(obj, name, sep) {
        return this._getProperty(obj, name, sep, false);
    }
    _getProperty(obj, name, sep, forceObject) {
        if (!obj)
            return undefined;
        const names = name.split(sep || '.');
        // loop
        for (const name of names) {
            if (obj[name] === undefined || obj[name] === null) {
                if (forceObject) {
                    obj[name] = {};
                }
                else {
                    obj = obj[name];
                    break;
                }
            }
            obj = obj[name];
        }
        return obj;
    }
    parseFileBaseName(basename) {
        let fileName = this.fileMapping[basename] || basename;
        if (fileName.lastIndexOf('_') === fileName.length - 1) {
            fileName = fileName.substring(0, fileName.length - 1);
        }
        return fileName;
    }
    async renderFile({ targetFile, templateFile }) {
        const stats = fs_1.default.lstatSync(templateFile);
        if (stats.isSymbolicLink()) {
            const target = fs_1.default.readlinkSync(templateFile);
            fs_1.default.symlinkSync(target, targetFile);
            await this.console.log(`${targetFile} link to ${target}`);
        }
        else if (stats.isDirectory()) {
            await this.helper.ensureDir(targetFile);
        }
        else if (stats.isFile()) {
            const content = fs_1.default.readFileSync(templateFile);
            await this.console.log(`write to ${targetFile}`);
            // check if content is a text file
            let result;
            let changed;
            if (!istextorbinary_1.default.isTextSync(templateFile, content)) {
                result = content;
            }
            else {
                const _content = content.toString('utf8');
                result = await this.renderContent({ content: _content });
                changed = _content !== result;
            }
            // save
            fs_1.default.writeFileSync(targetFile, result);
            // format
            if (changed) {
                await this.helper.formatFile({ fileName: targetFile, logPrefix: 'format: ' });
            }
        }
        else {
            await this.console.log(`ignore ${templateFile}, only support file, dir, symlink`);
        }
    }
    async renderContent({ content }) {
        if (!content)
            return content;
        const data = this.getEjsData();
        const options = this.getEjsOptions();
        return await ejs_1.default.render(content, data, options);
    }
    getEjsOptions() {
        return {
            async: true,
            cache: false,
            compileDebug: true,
            outputFunctionName: 'echo',
            rmWhitespace: false,
        };
    }
    getEjsData() {
        return {
            cli: this.cli,
            ...this.context,
        };
    }
    getAstData(ast, snippet) {
        return {
            cli: this.cli,
            ast,
            snippet,
            ...this.context,
        };
    }
    async applySnippets({ targetDir, snippetsDir }) {
        // snippets
        let files = egg_born_utils_1.default.tools.globbySync('*.cjs', {
            cwd: snippetsDir,
            onlyFiles: true,
        });
        // snippets sort
        files = files
            .filter(item => item[0] !== '-')
            .sort((a, b) => this._parseSnippetFilePrefix(a) - this._parseSnippetFilePrefix(b));
        // for
        for (const file of files) {
            const snippetTemplatePath = path_1.default.join(snippetsDir, file);
            const snippet = this.requireDynamic(snippetTemplatePath);
            if (!snippet.file) {
                throw new Error(`should provider file path for: ${file}`);
            }
            let fileName;
            if (typeof snippet.file === 'function') {
                fileName = snippet.file(this.getEjsData());
            }
            else {
                fileName = await this.renderContent({ content: snippet.file });
            }
            if (!fileName) {
                // means ignore, so do nothing
            }
            else {
                const targetFile = path_1.default.join(targetDir, fileName);
                await this.applySnippet({ targetFile, snippet });
            }
        }
    }
    async applySnippet({ targetFile, snippet }) {
        await this.console.log(`apply changes to ${targetFile}`);
        // source code
        let sourceCode;
        if (fs_1.default.existsSync(targetFile)) {
            sourceCode = fs_1.default.readFileSync(targetFile);
            sourceCode = sourceCode.toString('utf8');
        }
        else {
            if (!snippet.init) {
                throw new Error(`should provider init content for: ${targetFile}`);
            }
            sourceCode = await this.renderContent({ content: snippet.init });
        }
        // language
        const language = snippet.parseOptions && snippet.parseOptions.language;
        // transform
        let outputCode;
        if (language === 'plain') {
            const ast = sourceCode;
            const outAst = await snippet.transform(this.getAstData(ast, snippet));
            outputCode = outAst;
        }
        else if (language === 'json') {
            const ast = JSON.parse(sourceCode);
            const outAst = await snippet.transform(this.getAstData(ast, snippet));
            outputCode = outAst === undefined ? outAst : JSON.stringify(outAst, null, 2);
        }
        else {
            const ast = (0, gogocode_1.default)(sourceCode, { parseOptions: snippet.parseOptions });
            const outAst = await snippet.transform(this.getAstData(ast, snippet));
            outputCode = outAst === undefined ? outAst : outAst.root().generate();
        }
        if (outputCode !== undefined) {
            // save
            fs_1.default.writeFileSync(targetFile, outputCode);
            // format
            await this.helper.formatFile({ fileName: targetFile, logPrefix: 'format: ' });
        }
    }
    _parseSnippetFilePrefix(fileName) {
        const num = fileName.split('-')[0];
        if (!num || isNaN(num))
            return 10000;
        return parseInt(num);
    }
    requireDynamic(file) {
        if (!file)
            throw new Error('file should not empty');
        let instance = require(file);
        const mtime = this._requireDynamic_getFileTime(file);
        if (instance.__requireDynamic_mtime === undefined) {
            instance.__requireDynamic_mtime = mtime;
        }
        else if (instance.__requireDynamic_mtime !== mtime) {
            delete require.cache[require.resolve(file)];
            instance = require(file);
            instance.__requireDynamic_mtime = mtime;
        }
        return instance;
    }
    _requireDynamic_getFileTime(file) {
        if (!path_1.default.isAbsolute(file))
            return null;
        const exists = fs_extra_1.default.pathExistsSync(file);
        if (!exists)
            return null;
        // stat
        const stat = fs_extra_1.default.statSync(file);
        return stat.mtime.valueOf();
    }
}
exports.LocalTemplate = LocalTemplate;
//# sourceMappingURL=local.template.js.map