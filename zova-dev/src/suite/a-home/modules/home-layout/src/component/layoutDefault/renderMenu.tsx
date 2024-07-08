import { BeanRenderBase, Local } from 'zova';
import { StyleLayoutDefault } from './style.js';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';
import { ServiceMenuEntity } from '../../api/index.js';
import EssentialLink from '../essentialLink/index.vue';
import { JSX } from 'vue/jsx-runtime';

export interface RenderMenu extends StyleLayoutDefault {}

@Local()
export class RenderMenu extends BeanRenderBase<ScopeModule> {
  _renderMenuItem(item: ServiceMenuEntity) {
    const titleLocale = this.app.meta.locale.getText(__ThisModule__, undefined, item.title);
    if (item.separator) {
      return <li></li>;
    }
    if (item.folder) {
      return (
        <li>
          <h2 class="menu-title">{titleLocale}</h2>
          <ul>{this._renderMenuItems(item.children)}</ul>
        </li>
      );
    }
    return (
      <li key={item.title}>
        <EssentialLink title={titleLocale} caption={item.caption} icon={item.icon} href={item.href} to={item.to} />
      </li>
    );
  }

  _renderMenuItems(items?: ServiceMenuEntity[]) {
    if (!items) return;
    const domItems: JSX.Element[] = [];
    for (const item of items) {
      domItems.push(this._renderMenuItem(item));
    }
    return domItems;
  }

  _renderMenu() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading || !queryMenus.data) return;
    const domItems = this._renderMenuItems(queryMenus.data);
    return <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">{domItems}</ul>;
  }
}
