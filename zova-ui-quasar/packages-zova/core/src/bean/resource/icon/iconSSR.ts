import { AppIconBase } from './iconBase.js';
import { IIconMeta } from './types.js';

export class AppIconSSR extends AppIconBase {
  private _iconSSR: Record<string, Record<string, Record<string, string>>> = {};

  protected __init__() {
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this._onRendered();
      });
    }
  }

  private _onRendered() {
    this.ctx.meta.ssr.context._meta.bodyTags += this._renderSSRContainer();
  }

  private _renderSSRContainer() {
    const contentModules = this._renderSSRModules();
    return `<div id="zova-svg-container" style="position: absolute; width: 0px; height: 0px; display: none;">${contentModules}</div>`;
  }

  private _renderSSRModules() {
    return Object.keys(this._iconSSR)
      .map(moduleName => {
        const moduleId = `zova-svg-module-${moduleName}`;
        const contentGroups = this._renderSSRGroups(this._iconSSR[moduleName], moduleName);
        return `<div id="${moduleId}">${contentGroups}</div>`;
      })
      .join('');
  }

  private _renderSSRGroups(iconSSRGroups: Record<string, Record<string, string>>, moduleName: string) {
    return Object.keys(iconSSRGroups)
      .map(groupName => {
        const groupId = `zova-svg-group-${moduleName}-${groupName}`;
        const contentIcons = this._renderSSRIcons(iconSSRGroups[groupName]);
        return `<svg id="${groupId}" xmlns="http://www.w3.org/2000/svg" xmlns:link="http://www.w3.org/1999/xlink">${contentIcons}</svg>`;
      })
      .join('');
  }

  private _renderSSRIcons(iconSSRIcons: Record<string, string>) {
    return Object.keys(iconSSRIcons)
      .map(symbolId => {
        return iconSSRIcons[symbolId];
      })
      .join('');
  }

  /** @internal */
  public _injectIconSSR(meta: IIconMeta) {
    const iconModule = this._getIconModule(meta.module);
    const iconGroup = iconModule[meta.group];
    if (!this._iconSSR[meta.module]) this._iconSSR[meta.module] = {};
    if (!this._iconSSR[meta.module][meta.group]) this._iconSSR[meta.module][meta.group] = {};
    this._iconSSR[meta.module][meta.group][meta.symbolId] = this._extractIconContent(iconGroup.svg, meta.symbolId)!;
    // ok
    return meta.symbolId;
  }
}
