import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';
import path from 'path';
import eggBornUtils from 'egg-born-utils';
import SVGCompiler from 'svg-baker';
import { optimize } from 'svgo';

declare module 'zova-cli' {
  interface ICommandArgv {}
}

export class CliToolsIcons extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const moduleNames = argv._;
    const total = moduleNames.length;
    for (let index = 0; index < total; index++) {
      const moduleName = moduleNames[index];
      // log
      await this.console.log({
        total,
        progress: index,
        text: moduleName,
      });
      // generate
      await this._generateIcons(moduleName);
    }
  }

  async _generateIcons(moduleName: string) {
    const module = this.helper.findModule(moduleName);
    if (!module) throw new Error(`module not found: ${moduleName}`);
    const modulePath = module.root;
    const iconsSrc = path.join(modulePath, 'icons');
    // groups
    const groups = await this._resolveGroups(iconsSrc);
    for (const group of groups) {
      group.iconNames = await this._generateIconsGroup(modulePath, iconsSrc, moduleName, group.name);
    }
    // src/config/icons.ts
    await this._generateFileConfigIcons(modulePath, groups);
    // src/config/index.ts
    await this._generateFileConfigIndex(modulePath, groups);
    // src/resource/icons.ts
    await this._generateFileResourceIcons(modulePath, groups, moduleName);
    // src/resource/index.ts
    await this._generateFileResourceIndex(modulePath, groups);
  }

  async _generateFileConfigIcons(modulePath, groups) {
    const groupsFrontImport: string[] = [];
    const groupsFrontExport: string[] = [];
    for (const group of groups) {
      groupsFrontImport.push(`import _${group.name} from '../assets/icons/groups/${group.name}.svg';`);
      groupsFrontExport.push(`${group.name}: _${group.name},`);
    }
    const jsContent = `${groupsFrontImport.join('\n')}\n\nexport const icons = {\n  ${groupsFrontExport.join('\n  ')}\n};\n`;
    const jsFile = path.join(modulePath, 'src/config/icons.ts');
    await fse.writeFile(jsFile, jsContent);
  }

  async _generateFileConfigIndex(modulePath, _groups) {
    const jsFile = path.join(modulePath, 'src/config/index.ts');
    let jsContent = (await fse.readFile(jsFile)).toString();
    const jsExport = "export * from './icons.js';";
    if (jsContent.indexOf(jsExport) === -1) {
      jsContent = jsContent.replace("export * from './constants.js';", `export * from './constants.js';\n${jsExport}`);
    }
    await fse.writeFile(jsFile, jsContent);
  }

  async _generateFileResourceIcons(modulePath, groups, moduleName) {
    const groupsFrontExport: string[] = [];
    for (const group of groups) {
      for (const iconName of group.iconNames) {
        const recordId = this._getRecordId(moduleName, group.name, iconName);
        groupsFrontExport.push(`'${recordId}': true;`);
      }
    }
    const jsContent = `import 'zova';
  declare module 'zova' {
  export interface IIconRecord {
    ${groupsFrontExport.join('\n    ').trim()}
  }
}
`;
    const jsFile = path.join(modulePath, 'src/resource/icons.ts');
    await fse.writeFile(jsFile, jsContent);
  }

  async _generateFileResourceIndex(modulePath, _groups) {
    const jsFile = path.join(modulePath, 'src/resource/index.ts');
    let jsContent = (await fse.readFile(jsFile)).toString();
    const jsExport = "export * from './icons.js';";
    if (jsContent.indexOf(jsExport) === -1) {
      jsContent = jsContent.replace(
        "export * from './components.js';",
        `export * from './components.js';\n${jsExport}`,
      );
    }
    await fse.writeFile(jsFile, jsContent);
  }

  async _resolveGroups(iconsSrc: string) {
    const groupPaths = await eggBornUtils.tools.globbyAsync(`${iconsSrc}/*`, { onlyDirectories: true });
    return groupPaths.map(item => {
      return {
        name: path.basename(item),
      };
    });
  }

  async _generateIconsGroup(modulePath: string, iconsSrc: string, moduleName: string, groupName: string) {
    // icons
    const files = await eggBornUtils.tools.globbyAsync(`${iconsSrc}/${groupName}/*.svg`);
    const iconNames = files.map(item => path.basename(item, '.svg'));
    // symbols
    const symbols: string[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const iconName = iconNames[index];
      const symbol = await this._combineSymbol(file, moduleName, groupName, iconName);
      symbols.push(symbol);
    }
    // xml
    const xml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
${symbols.join('\n')}
</svg>`;
    // write
    const pathDest = path.join(modulePath, 'src/assets/icons', 'groups');
    await fse.ensureDir(pathDest);
    const fileDest = path.join(pathDest, `${groupName}.svg`);
    await fse.writeFile(fileDest, xml);
    // ok
    return iconNames;
  }

  async _combineSymbol(file, moduleName, groupName, iconName): Promise<string> {
    // load
    let content = await fse.readFile(file);
    // optimize
    const { data } = await optimize(content, {});
    content = data || content;
    // symbol
    const svgSymbol = await new SVGCompiler().addSymbol({
      id: this._getSymbolId(moduleName, groupName, iconName),
      content,
      path: file,
    });
    content = svgSymbol.render();
    return content;
  }

  private _getSymbolId(moduleName: string, groupName: string, iconName: string) {
    return `cabloy-svg-icon-${moduleName}-${groupName}-${iconName}`;
  }

  private _getRecordId(moduleName: string, groupName: string, iconName: string) {
    if (moduleName === 'home-icon') moduleName = '';
    if (groupName === 'default') groupName = '';
    return `${moduleName}:${groupName}:${iconName}`;
  }
}
