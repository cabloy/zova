import { BeanRenderBase, Local } from 'zova';
import { StyleLayoutDefault } from './style.js';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';
import EssentialLink from '../essentialLink/index.vue';
import { ServiceMenuEntity } from '../../api/index.js';
import { JSX } from 'vue/jsx-runtime';

export interface RenderSidebar extends StyleLayoutDefault {}

@Local()
export class RenderSidebar extends BeanRenderBase<ScopeModule> {
  _renderSidebar() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this._renderMenu()}
      </div>
    );
  }

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
