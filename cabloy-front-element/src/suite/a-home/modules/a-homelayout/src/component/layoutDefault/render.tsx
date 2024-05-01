import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherLayoutDefault, TypeMenuItem } from './mother.js';
import { ElButton, ElConfigProvider, ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { JSX } from 'vue/jsx-runtime';
//import EssentialLink from '../essentialLink/index.vue';

export interface RenderLayoutDefault extends MotherLayoutDefault { }

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: TypeMenuItem, levels: number[]) {
    // index
    const index = levels.join('-');
    // folder
    if (item.folder) {
      const slots = {
        title: () => {
          return (
            <span>{item.title}</span>
          )
        }
      }
      const domItems = this._renderMenuItems(item.children, levels);
      return <ElSubMenu key={index} index={index} v-slots={slots}>
        {domItems}
      </ElSubMenu>
    }
    // item
    const route = { path: item.to };
    return <ElMenuItem key={index} index={index} route={route} onClick={() => {
      if (item.href) {
        window.open(item.href);
      }
    }}>{item.title}</ElMenuItem>
  }
  _renderMenuItems(items: TypeMenuItem[] | undefined, levels: number[]) {
    if (!items) return [];
    const domItems: JSX.Element[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      domItems.push(this._renderMenuItem(item, levels.concat(index + 1)));
    }
    return domItems;
  }
  _renderMenu() {
    const domItems = this._renderMenuItems(this.menu, []);
    return <ElMenu router class="el-menu-vertical-demo" collapse={this.leftDrawerOpen}>{domItems}</ElMenu>;
  }

  _renderHeader() {
    return (
      <ElMenu class="el-menu-demo" mode="horizontal">
        <ElMenuItem index="1">Element Plus</ElMenuItem>
      </ElMenu >
    )
  }

  render() {
    return <ElConfigProvider>
      <ElButton icon="::done"></ElButton>
      <ElIcon>::done</ElIcon>
      {this._renderHeader()}
      <div class="flex main-container">
        {this._renderMenu()}
        <router-view />
      </div>
    </ElConfigProvider>
  }
}
