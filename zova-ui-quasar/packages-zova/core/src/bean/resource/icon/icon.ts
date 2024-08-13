import { reactive } from 'vue';
import { BeanSimple } from '../../beanSimple.js';
import { IIconInfo, IIconMeta, TypeIconModules, TypeIconSymbols } from './types.js';
import { IconGroup } from './iconGroup.js';

const XMLNS = 'http://www.w3.org/2000/svg';
const XMLNS_LINK = 'http://www.w3.org/1999/xlink';

export class AppIcon extends BeanSimple {
  private _iconSymbols: TypeIconSymbols = reactive({});
  private _iconMoudles: TypeIconModules = {};
  //private _iconSSR: Record<string, Record<string, string>> = {};

  protected __init__() {
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this._onRendered();
      });
    }
  }

  private _onRendered() {
    this.ctx.meta.ssr.context._meta.bodyTags +=
      '<div id="zova-svg-container" style="position: absolute; width: 0px; height: 0px; display: none;"><div id="zova-svg-module-home-icon"><svg id="zova-svg-group-home-icon-default" xmlns="http://www.w3.org/2000/svg" xmlns:link="http://www.w3.org/1999/xlink"><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24" id="zova-svg-icon-home-icon-default-menu"><path fill="currentColor" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"></path></symbol><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24" id="zova-svg-icon-home-icon-default-home"><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"></path></symbol><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 1024 1024" id="zova-svg-icon-home-icon-default-heart"><path fill="currentColor" d="M923 283.6a260 260 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.3 265.3 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39q-15 9.15-28.5 20.1-13.5-10.95-28.5-20.1c-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.4 258.4 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9"></path></symbol></svg><svg id="zova-svg-group-home-icon-social" xmlns="http://www.w3.org/2000/svg" xmlns:link="http://www.w3.org/1999/xlink"><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="zova-svg-icon-home-icon-social-school"><path fill="currentColor" d="M21 17v-6.9L12 15 1 9l11-6 11 6v8zm-9 4-7-3.8v-5l7 3.8 7-3.8v5z"></path></symbol></svg><svg id="zova-svg-group-home-icon-editor" xmlns="http://www.w3.org/2000/svg" xmlns:link="http://www.w3.org/1999/xlink"><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24" id="zova-svg-icon-home-icon-editor-code"><path fill="currentColor" d="M8.7 15.9 4.8 12l3.9-3.9a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0l-4.59 4.59a.996.996 0 0 0 0 1.41l4.59 4.6c.39.39 1.01.39 1.4 0a.984.984 0 0 0 0-1.4m6.6 0 3.9-3.9-3.9-3.9a.984.984 0 0 1 0-1.4.984.984 0 0 1 1.4 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.6a.984.984 0 0 1-1.4 0 .984.984 0 0 1 0-1.4"></path></symbol></svg></div></div>';
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

  private _getIconModule(moduleName: string) {
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
