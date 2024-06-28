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
    return <div class="menu-list">{domItems}</div>;
  }

  render() {
    return (
      <div>
        <div>{this._renderMenu()}</div>
        <button
          onClick={() => {
            this.$$modelUser.logout.mutate();
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
