import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import { JSX } from 'vue/jsx-runtime';
import EssentialLink from '../essentialLink/index.vue';
import { ServiceMenuEntity } from '../../api/index.js';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ServiceMenuEntity) {
    if (item.separator) {
      return <div class="menu-separator"> - - - </div>;
    }
    if (item.folder) {
      return <div class="menu-folder">{item.title}</div>;
    }
    return (
      <EssentialLink
        key={item.title}
        title={item.title}
        caption={item.caption}
        icon={item.icon}
        href={item.href}
        to={item.to}
      />
    );
  }
  _renderMenu() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading || !queryMenus.data) return;
    const domItems: JSX.Element[] = [];
    for (const item of queryMenus.data) {
      domItems.push(this._renderMenuItem(item));
    }
    return <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">{domItems}</ul>;
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
        <div class="mx-2 flex-1 px-2">Zova</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <li>
              <a>userName</a>
            </li>
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
          <router-view />
        </div>
        {this._renderSidebar()}
      </div>
    );
  }

  render1() {
    return (
      <div>
        <div>{this._renderMenu()}</div>
        <button
          onClick={() => {
            this.$$modelUser.logout().mutate();
          }}
        >
          Logout
        </button>
        <div>
          <router-view />
        </div>
      </div>
    );
  }
}
