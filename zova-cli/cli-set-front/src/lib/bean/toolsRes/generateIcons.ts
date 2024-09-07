import path from 'path';
import eggBornUtils from 'egg-born-utils';
import fse from 'fs-extra';
import SVGCompiler from 'svg-baker';
import { optimize } from 'svgo';

export async function generateIcons(moduleName: string, modulePath: string) {
  const iconsSrc = path.join(modulePath, 'icons');
  // groups
  const groups = await _resolveGroups(iconsSrc);
  for (const group of groups) {
    group.iconNames = await _generateIconsGroup(modulePath, iconsSrc, moduleName, group.name);
  }
  // src/config/icons.ts
  const configIcons = await _generateFileConfigIcons(groups);
  // src/resource/icons.ts
  const resourceIcons = await _generateFileResourceIcons(groups, moduleName);
  // combine
  const content = `/** icons: begin */
${configIcons}
${resourceIcons}
/** icons: end */
`;
  return content;
}

async function _generateFileConfigIcons(groups) {
  const groupsFrontImport: string[] = [];
  const groupsFrontExport: string[] = [];
  for (const group of groups) {
    groupsFrontImport.push(`// @ts-ignore icons\nimport icon_${group.name} from './icons/groups/${group.name}.svg';`);
    groupsFrontExport.push(`${group.name}: icon_${group.name},`);
  }
  const jsContent = `${groupsFrontImport.join('\n')}\n\nexport const icons = {\n  ${groupsFrontExport.join('\n  ')}\n};\n`;
  return jsContent;
}

async function _generateFileResourceIcons(groups, moduleName) {
  const groupsFrontExport: string[] = [];
  for (const group of groups) {
    for (const iconName of group.iconNames) {
      const recordId = _getRecordId(moduleName, group.name, iconName);
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
  return jsContent;
}

async function _resolveGroups(iconsSrc: string) {
  const groupPaths = await eggBornUtils.tools.globbyAsync(`${iconsSrc}/*`, { onlyDirectories: true });
  return groupPaths.map(item => {
    return {
      name: path.basename(item),
    };
  });
}

async function _generateIconsGroup(modulePath: string, iconsSrc: string, moduleName: string, groupName: string) {
  // icons
  const files = await eggBornUtils.tools.globbyAsync(`${iconsSrc}/${groupName}/*.svg`);
  const iconNames = files.map(item => path.basename(item, '.svg'));
  // symbols
  const symbols: string[] = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const iconName = iconNames[index];
    const symbol = await _combineSymbol(file, moduleName, groupName, iconName);
    symbols.push(symbol);
  }
  // xml
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
${symbols.join('\n')}
</svg>`;
  // write
  const pathDest = path.join(modulePath, 'src/.res/icons', 'groups');
  await fse.ensureDir(pathDest);
  const fileDest = path.join(pathDest, `${groupName}.svg`);
  await fse.writeFile(fileDest, xml);
  // ok
  return iconNames;
}

async function _combineSymbol(file, moduleName, groupName, iconName): Promise<string> {
  // load
  let content = (await fse.readFile(file)).toString();
  // optimize
  const { data } = await optimize(content, {});
  content = data || content;
  // symbol
  const svgSymbol = await new SVGCompiler().addSymbol({
    id: _getSymbolId(moduleName, groupName, iconName),
    content,
    path: file,
  });
  content = svgSymbol.render();
  return content;
}

function _getSymbolId(moduleName: string, groupName: string, iconName: string) {
  return `zova-svg-icon-${moduleName}-${groupName}-${iconName}`;
}

function _getRecordId(moduleName: string, groupName: string, iconName: string) {
  if (moduleName === 'home-icon') moduleName = '';
  if (groupName === 'default') groupName = '';
  return `${moduleName}:${groupName}:${iconName}`;
}
