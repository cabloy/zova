import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerLayoutDefault, TypeMenuItem } from './controller.js';
import { ElConfigProvider, ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { JSX } from 'vue/jsx-runtime';
//import EssentialLink from '../essentialLink/index.vue';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: TypeMenuItem, levels: number[]) {
    // index
    const index = levels.join('-');
    // folder
    if (item.folder) {
      const slots = {
        title: () => {
          return <span>{item.title}</span>;
        },
      };
      const domItems = this._renderMenuItems(item.children, levels);
      return (
        <ElSubMenu key={index} index={index} v-slots={slots}>
          {domItems}
        </ElSubMenu>
      );
    }
    // item
    const route = { path: item.to };
    const slots = {
      title: () => {
        return (
          <div>
            <ElIcon>{item.icon}</ElIcon>
            <span>{item.title}</span>
          </div>
        );
      },
    };
    return (
      <ElMenuItem
        key={index}
        index={index}
        route={route}
        v-slots={slots}
        onClick={() => {
          if (item.href) {
            window.open(item.href);
          }
        }}
      ></ElMenuItem>
    );
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
    return (
      <ElMenu router class="el-menu-vertical-demo" collapse={this.leftDrawerOpen}>
        {domItems}
      </ElMenu>
    );
  }

  _renderHeader() {
    return (
      <ElMenu class="el-menu-demo" mode="horizontal">
        <ElMenuItem index="1">Element Plus</ElMenuItem>
      </ElMenu>
    );
  }

  render() {
    return (
      <ElConfigProvider>
        {this._renderHeader()}
        <div class="flex main-container">
          {this._renderMenu()}
          <router-view />
        </div>
      </ElConfigProvider>
    );
  }
}
