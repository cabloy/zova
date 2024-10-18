import { BeanCliBase } from '@cabloy/cli';
import { IModuleInfo } from '@cabloy/module-info';
import fs from 'fs';
import path from 'path';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    name: string;
    suiteInfo: IModuleInfo;
  }
}

export class CliCreateSuite extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // nameMeta
    const nameMeta = this.helper.parseNameMeta(argv.name);
    const suiteDir = nameMeta.directory || 'suite';
    argv.name = nameMeta.short;
    // suite name/info
    const suiteName = argv.name;
    argv.suiteInfo = this.helper.parseSuiteInfo(suiteName);
    // check if exists
    const _suite = this.helper.findSuite(suiteName);
    if (_suite) {
      throw new Error(`suite exists: ${suiteName}`);
    }
    // target dir
    let targetDir = path.join(argv.projectPath, `src/${suiteDir}`, suiteName);
    if (fs.existsSync(targetDir)) {
      throw new Error(`suite exists: ${suiteName}`);
    }
    targetDir = await this.helper.ensureDir(targetDir);
    // templateDir
    const templateDir = this.template.resolveTemplatePath({
      setName: __ThisSetName__,
      path: 'create/suite',
    });
    // render
    await this.template.renderDir({ targetDir, templateDir });
  }
}
