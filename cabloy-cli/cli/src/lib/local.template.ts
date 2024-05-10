import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';

import eggBornUtils from 'egg-born-utils';
import isTextOrBinary from 'istextorbinary';
import ejs from '@zhennann/ejs';
import gogocode from 'gogocode';
import { BeanCliBase } from './bean.cli.base.js';
import { commandsConfig } from '../config.js';

export class LocalTemplate {
  cli: BeanCliBase;

  constructor(cli) {
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
    return commandsConfig;
  }

  get fileMapping() {
    return this.moduleConfig.template.render.fileMapping;
  }

  get filesIgnore() {
    return this.moduleConfig.template.render.ignore;
  }

  resolveTemplatePath({ setName, path: _path }: any) {
    const sets = this.moduleConfig.sets;
    const modulePath = require.resolve(`${sets[setName]}/package.json`);
    return path.join(path.dirname(modulePath), 'cli/templates', _path);
  }

  async renderBoilerplateAndSnippets({ targetDir, setName, snippetsPath, boilerplatePath }: any) {
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

  async renderDir({ targetDir, templateDir }: any) {
    const { argv } = this.context;
    // files
    const files = eggBornUtils.tools.globbySync('**/*', {
      cwd: templateDir,
      dot: true,
      onlyFiles: false,
      followSymlinkedDirectories: false,
    });
    // loop
    for (const file of files) {
      const { dir: dirname, base: basename } = path.parse(file);
      if (this.filesIgnore.includes(basename)) continue;
      const templateFile = path.join(templateDir, file);
      const fileName = this.parseFileBaseName(basename);
      const parentPath = path.join(targetDir, dirname);
      const targetFile = path.join(parentPath, this.replaceTemplate(fileName, argv));
      await this.renderFile({ targetFile, templateFile });
      if (fileName !== '.gitkeep') {
        const gitkeep = path.join(parentPath, '.gitkeep');
        if (fs.existsSync(gitkeep)) {
          fs.unlinkSync(gitkeep);
        }
      }
    }
    return files;
  }

  replaceTemplate(content, scope) {
    if (!content) return null;
    return content.toString().replace(/(\\)?{{ *([\w\.]+) *}}/g, (block, skip, key) => {
      if (skip) {
        return block.substring(skip.length);
      }
      const value = this.getProperty(scope, key);
      return value !== undefined ? value : '';
    });
  }

  getProperty(obj, name, sep?) {
    return this._getProperty(obj, name, sep, false);
  }

  _getProperty(obj, name, sep, forceObject) {
    if (!obj) return undefined;
    const names = name.split(sep || '.');
    // loop
    for (const name of names) {
      if (obj[name] === undefined || obj[name] === null) {
        if (forceObject) {
          obj[name] = {};
        } else {
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

  async renderFile({ targetFile, templateFile }: any) {
    const stats = fs.lstatSync(templateFile);
    if (stats.isSymbolicLink()) {
      const target = fs.readlinkSync(templateFile);
      fs.symlinkSync(target, targetFile);
      await this.console.log(`${targetFile} link to ${target}`);
    } else if (stats.isDirectory()) {
      await this.helper.ensureDir(targetFile);
    } else if (stats.isFile()) {
      const content = fs.readFileSync(templateFile);
      await this.console.log(`write to ${targetFile}`);
      // check if content is a text file
      let result;
      let changed;
      if (!isTextOrBinary.isTextSync(templateFile, content)) {
        result = content;
      } else {
        const _content = content.toString('utf8');
        result = await this.renderContent({ content: _content });
        changed = _content !== result;
      }
      // save
      fs.writeFileSync(targetFile, result);
      // format
      if (changed) {
        await this.helper.formatFile({ fileName: targetFile, logPrefix: 'format: ' });
      }
    } else {
      await this.console.log(`ignore ${templateFile}, only support file, dir, symlink`);
    }
  }

  async renderContent({ content }: any) {
    if (!content) return content;
    const data = this.getEjsData();
    const options = this.getEjsOptions();
    return await ejs.render(content, data, options);
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

  async applySnippets({ targetDir, snippetsDir }: any) {
    // snippets
    let files = eggBornUtils.tools.globbySync('*.cjs', {
      cwd: snippetsDir,
      onlyFiles: true,
    });
    // snippets sort
    files = files
      .filter(item => item[0] !== '-')
      .sort((a, b) => this._parseSnippetFilePrefix(a) - this._parseSnippetFilePrefix(b));
    // for
    for (const file of files) {
      const snippetTemplatePath = path.join(snippetsDir, file);
      const snippet = this.requireDynamic(snippetTemplatePath);
      if (!snippet.file) {
        throw new Error(`should provider file path for: ${file}`);
      }
      let fileName;
      if (typeof snippet.file === 'function') {
        fileName = snippet.file(this.getEjsData());
      } else {
        fileName = await this.renderContent({ content: snippet.file });
      }
      if (!fileName) {
        // means ignore, so do nothing
      } else {
        const targetFile = path.join(targetDir, fileName);
        await this.applySnippet({ targetFile, snippet });
      }
    }
  }

  async applySnippet({ targetFile, snippet }: any) {
    await this.console.log(`apply changes to ${targetFile}`);
    // source code
    let sourceCode;
    if (fs.existsSync(targetFile)) {
      sourceCode = fs.readFileSync(targetFile);
      sourceCode = sourceCode.toString('utf8');
    } else {
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
    } else if (language === 'json') {
      const ast = JSON.parse(sourceCode);
      const outAst = await snippet.transform(this.getAstData(ast, snippet));
      outputCode = outAst === undefined ? outAst : JSON.stringify(outAst, null, 2);
    } else {
      const ast = gogocode(sourceCode, { parseOptions: snippet.parseOptions });
      const outAst = await snippet.transform(this.getAstData(ast, snippet));
      outputCode = outAst === undefined ? outAst : outAst.root().generate();
    }
    if (outputCode !== undefined) {
      // save
      fs.writeFileSync(targetFile, outputCode);
      // format
      await this.helper.formatFile({ fileName: targetFile, logPrefix: 'format: ' });
    }
  }

  _parseSnippetFilePrefix(fileName) {
    const num = fileName.split('-')[0];
    if (!num || isNaN(num)) return 10000;
    return parseInt(num);
  }

  requireDynamic(file) {
    if (!file) throw new Error('file should not empty');
    let instance = require(file);
    const mtime = this._requireDynamic_getFileTime(file);
    if (instance.__requireDynamic_mtime === undefined) {
      instance.__requireDynamic_mtime = mtime;
    } else if (instance.__requireDynamic_mtime !== mtime) {
      delete require.cache[require.resolve(file)];
      instance = require(file);
      instance.__requireDynamic_mtime = mtime;
    }
    return instance;
  }

  private _requireDynamic_getFileTime(file) {
    if (!path.isAbsolute(file)) return null;
    const exists = fse.pathExistsSync(file);
    if (!exists) return null;
    // stat
    const stat = fse.statSync(file);
    return stat.mtime.valueOf();
  }
}
