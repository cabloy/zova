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
    // pkg/pkgOriginal
    const pkgOriginal = await this.helper.loadJSONFile(pkgOriginalFile);
    if (fse.existsSync(pkgFile)) {
      const pkg = await this.helper.loadJSONFile(pkgFile);
      // save back versions
      await this._saveBackVersions(pkg, pkgOriginal, pkgOriginalFile);
    }
    // generate pkg from pkgOriginal
    await this._generatePkgFromPkgOriginal(pkgOriginal, pkgFile);
  }

  async _generatePkgFromPkgOriginal(pkgOriginal, pkgFile) {
    const devDeps = pkgOriginal.devDependencies;
    // all modules
    this.modulesMeta.modulesArray.forEach(module => {
      devDeps[module.package.name] = '^' + module.package.version;
    });
    await this.helper.saveJSONFile(pkgFile, pkgOriginal);
  }

  async _saveBackVersions(pkg, pkgOriginal, pkgOriginalFile) {
    let changed = false;
    for (const field of ['dependencies', 'devDependencies']) {
      const fieldObj = pkg[field];
      const fieldObjOriginal = pkgOriginal[field];
      for (const key in fieldObjOriginal) {
        if (fieldObjOriginal[key] !== fieldObj[key]) {
          fieldObjOriginal[key] = fieldObj[key];
          changed = true;
        }
      }
    }
    if (changed) {
      await this.helper.saveJSONFile(pkgOriginalFile, pkgOriginal);
    }
  }
}
