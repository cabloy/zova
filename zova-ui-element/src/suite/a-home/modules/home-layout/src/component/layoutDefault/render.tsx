import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import {
  ElAside,
  ElConfigProvider,
  ElContainer,
  ElHeader,
  ElIcon,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
} from 'element-plus';
import { JSX } from 'vue/jsx-runtime';
import { RouterView } from 'vue-router';
import { ServiceMenuEntity } from '../../service/menu.js';
//import EssentialLink from '../essentialLink/index.vue';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ServiceMenuEntity) {
    // folder
    if (item.folder) {
      const slots = {
        title: () => {
          return <span>{item.title}</span>;
        },
      };
      const domItems = this._renderMenuItems(item.children);
      return (
        <ElSubMenu key={item.key} index={item.key} v-slots={slots}>
          {domItems}
        </ElSubMenu>
      );
    }
    // item
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
        key={item.key}
        index={item.key}
        v-slots={slots}
        onClick={() => {
          if (item.href) {
            window.open(item.href);
          } else {
            this.$router.push(item.to!);
          }
        }}
      ></ElMenuItem>
    );
  }
  _renderMenuItems(items: ServiceMenuEntity[] | undefined) {
    if (!items) return [];
    const domItems: JSX.Element[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      domItems.push(this._renderMenuItem(item));
    }
    return domItems;
  }
  _renderMenu() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading) return;
    const domItems = this._renderMenuItems(queryMenus.data);
    return (
      <ElMenu
        class="el-menu-vertical-demo"
        collapse={this.leftDrawerOpen}
        defaultActive={this.activeMenuItemKey}
        defaultOpeneds={this.activeMenuSubKeys}
      >
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
        <ElContainer>
          <ElHeader>{this._renderHeader()}</ElHeader>
          <ElContainer class="main-container">
            <ElAside>{this._renderMenu()}</ElAside>
            <ElMain>
              <RouterView />
            </ElMain>
          </ElContainer>
        </ElContainer>
      </ElConfigProvider>
    );
  }
}
