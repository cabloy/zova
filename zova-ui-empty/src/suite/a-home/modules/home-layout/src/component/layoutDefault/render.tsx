import { BeanRenderBase, Local } from 'zova';
import type { StyleLayoutDefault } from './style.js';
import { JSX } from 'vue/jsx-runtime';
import { ScopeModule } from '../../.metadata/this.js';
import EssentialLink from '../essentialLink/index.vue';
import { RouterView } from 'vue-router';
import { ServiceMenuEntity } from '../../service/menu.js';

export interface RenderLayoutDefault extends StyleLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase<ScopeModule> {
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
    return <div class={this.cMenuList}>{domItems}</div>;
  }

  render() {
    return (
      <div>
        <div>{this._renderMenu()}</div>
        <div>
          <RouterView />
        </div>
      </div>
    );
  }
}
