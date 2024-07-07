import { BeanRenderBase, Local, iconh } from 'zova';
import type { StyleLayoutDefault } from './style.js';
import { JSX } from 'vue/jsx-runtime';
import EssentialLink from '../essentialLink/index.vue';
import { ServiceMenuEntity } from '../../api/index.js';
import { ScopeModule, __ThisModule__ } from '../../resource/this.js';

export interface RenderLayoutDefault extends StyleLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase<ScopeModule> {
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

  _renderUser() {
    return (
      <li>
        <details>
          <summary>
            {this.$$modelUser.user?.username}
            {iconh(this.$$modelUser.user?.avatar as any)}
          </summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-32">
            <li>
              <a
                onClick={() => {
                  this.$$modelUser.logout().mutate();
                }}
              >
                {this.scope.locale.Logout()}
              </a>
            </li>
          </ul>
        </details>
      </li>
    );
  }

  _renderHeader() {
    return (
      <div class="navbar bg-base-300 w-full">
        <div class="flex-none lg:hidden">
          <label htmlFor="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">{this.$$renderTabs._renderTabs()}</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            {this.$$renderLocale._renderLocale()}
            {this.$$renderTheme._renderThemeDark()}
            {this.$$renderTheme._renderThemeName()}
            {this._renderUser()}
          </ul>
        </div>
      </div>
    );
  }

  _renderSidebar() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this._renderMenu()}
      </div>
    );
  }

  render() {
    return (
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {this._renderHeader()}
          {this.$$renderTabs._renderContent()}
        </div>
        {this._renderSidebar()}
      </div>
    );
  }
}
