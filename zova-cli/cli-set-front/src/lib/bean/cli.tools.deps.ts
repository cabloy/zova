import path from 'node:path';
import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';

declare module 'zova-cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliToolsDeps extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // generate
    await this._generate(projectPath);
  }

  async _generate(projectPath: string) {
    const pkgFile = path.join(projectPath, 'package.json');
    const pkgOriginalFile = path.join(projectPath, 'package.original.json');
    // check original
    if (!fse.existsSync(pkgOriginalFile)) {
      await fse.copyFile(pkgFile, pkgOriginalFile);
    }
    // pkg
    if (fse.existsSync(pkgFile)) {
      const pkg = await this.helper.loadJSONFile(fse.existsSync(pkgFile) ? pkgFile : pkgOriginalFile);
      const pkgOriginal = require(pkgOriginalFile);
    }
    // check versions

    if (fse.existsSync(pkgFile)) {
    }

    this.console.log(projectPath);
  }
}
