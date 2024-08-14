import { reactive } from 'vue';
import { BeanSimple } from '../../beanSimple.js';
import { IIconInfo, IIconMeta, TypeIconModules, TypeIconSymbols } from './types.js';
import { IconGroup } from './iconGroup.js';
import { AppIcon } from './icon.js';
import { Cast } from '../../../types/utils/cast.js';

const XMLNS = 'http://www.w3.org/2000/svg';
const XMLNS_LINK = 'http://www.w3.org/1999/xlink';

export class AppIconBase extends BeanSimple {
  protected _iconSymbols: TypeIconSymbols = reactive({});
  protected _iconMoudles: TypeIconModules = {};
  //private _iconSSR: Record<string, Record<string, string>> = {};

  protected get self() {
    return Cast<AppIcon>(this);
  }

  // undefined: ignore
  // '': empty icon
  parseIconInfoSync(iconName?: string): IIconInfo | undefined {
    // parts
    const meta = this.parseIconMeta(iconName);
    if (!meta) return undefined;
    // empty
    const iconEmpty = { meta, symbolId: '' };
    // check if exists
    if (this._iconSymbols[meta.fullName] === undefined) {
      this.parseIconInfo(iconName);
      return iconEmpty;
    }
    return { meta, symbolId: meta.symbolId };
  }

  async parseIconInfo(iconName?: string): Promise<IIconInfo | undefined> {
    // parts
    const meta = this.parseIconMeta(iconName);
    if (!meta) return undefined;
    // check if exists
    if (this._iconSymbols[meta.fullName]) {
      return { meta, symbolId: this._iconSymbols[meta.fullName] };
    }
    // pre set
    this._iconSymbols[meta.fullName] = '';
    // icon group
    const iconGroup = await this.parseIconGroup(meta.module, meta.group);
    if (!iconGroup) return undefined;
    // icon inject
    const symbolId = this._injectIcon(meta);
    this._iconSymbols[meta.fullName] = symbolId;
    // ok
    return { meta, symbolId };
  }

  public async parseIconGroup(moduleName: string, groupName: string): Promise<string | undefined> {
    // check if exists
    const iconModule = this._getIconModule(moduleName);
    if (iconModule[groupName]) {
      await iconModule[groupName].loaded.wait();
      return iconModule[groupName].svg;
    }
    // record
    iconModule[groupName] = new IconGroup();
    // parse
    const svg = await this._parseIconGroupInner(moduleName, groupName);
    // touch
    iconModule[groupName].svg = svg;
    iconModule[groupName].loaded.touch();
    // ok
    return iconModule[groupName].svg;
  }

  private async _parseIconGroupInner(moduleName: string, groupName: string): Promise<string | undefined> {
    // module
    const module = await this.app.meta.module.use(moduleName);
    if (!module) return;
    // icons
    const icons = module.resource.icons;
    const groupUrl = icons[groupName];
    if (!groupUrl) return;
    // fetch
    let svg;
    if (process.env.SERVER && process.env.DEV) {
      const path = await import('node:path');
      const fs = await import('node:fs/promises');
      svg = await fs.readFile(path.join(process.cwd(), groupUrl), { encoding: 'utf8' });
    } else {
      const res = await fetch(groupUrl);
      if (!res.ok) return;
      svg = await res.text();
    }
    return svg;
  }

  private _injectIcon(meta: IIconMeta) {
    const iconModule = this._getIconModule(meta.module);
    const iconGroup = iconModule[meta.group];
    if (process.env.SERVER) {
      return meta.symbolId;
    }
    // inject container
    let domContainer = document.getElementById('zova-svg-container');
    if (!domContainer) {
      domContainer = document.createElement('div');
      domContainer.style.position = 'absolute';
      domContainer.style.width = '0';
      domContainer.style.height = '0';
      domContainer.style.display = 'none';
      domContainer.id = 'zova-svg-container';
      document.body.appendChild(domContainer);
    }
    // inject module
    let domModule = document.getElementById(`zova-svg-module-${meta.module}`);
    if (!domModule) {
      domModule = document.createElement('div');
      domModule.id = `zova-svg-module-${meta.module}`;
      domContainer.appendChild(domModule);
    }
    // inject group
    let domGroup = document.getElementById(`zova-svg-group-${meta.module}-${meta.group}`) as unknown as SVGSVGElement;
    if (!domGroup) {
      domGroup = document.createElementNS(XMLNS, 'svg');
      domGroup.id = `zova-svg-group-${meta.module}-${meta.group}`;
      domGroup.setAttribute('xmlns', XMLNS);
      domGroup.setAttribute('xmlns:link', XMLNS_LINK);
      domModule.appendChild(domGroup);
    }
    // inject icon
    const domIcon = document.getElementById(meta.symbolId) as unknown as SVGElement;
    if (!domIcon) {
      const symbolPattern = new RegExp(`<symbol.*?id="${meta.symbolId}".*?>.*?</symbol>`);
      const matched = symbolPattern.exec(iconGroup.svg || '');
      if (matched) {
        domGroup.insertAdjacentHTML('beforeend', matched[0]);
      }
    }
    // ok
    return meta.symbolId;
  }

  protected _getIconModule(moduleName: string) {
    if (!this._iconMoudles[moduleName]) {
      this._iconMoudles[moduleName] = {};
    }
    return this._iconMoudles[moduleName];
  }

  parseIconMeta(iconName?: string): IIconMeta | undefined {
    if (!iconName) return;
    // split module:group:name
    const parts = iconName.split(':');
    if (parts.length !== 3) {
      return;
    }
    const module = parts[0] || this.app.config.icon.defaultModule;
    const group = parts[1] || 'default';
    const name = parts[2] || '';
    if (module.indexOf('-') === -1 || !name) {
      return;
    }
    return {
      module,
      group,
      name,
      fullName: this._getFullName(module, group, name),
      symbolId: this._getSymbolId(module, group, name),
    };
  }

  private _getSymbolId(module: string, group: string, name: string) {
    return `zova-svg-icon-${module}-${group}-${name}`;
  }

  private _getFullName(module: string, group: string, name: string) {
    return `${module}:${group}:${name}`;
  }
}
