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
import { ServiceMenuEntity } from '../../api/index.js';
//import EssentialLink from '../essentialLink/index.vue';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ServiceMenuEntity, levels: number[]) {
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
  _renderMenuItems(items: ServiceMenuEntity[] | undefined, levels: number[]) {
    if (!items) return [];
    const domItems: JSX.Element[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      domItems.push(this._renderMenuItem(item, levels.concat(index + 1)));
    }
    return domItems;
  }
  _renderMenu() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading) return;
    const domItems = this._renderMenuItems(queryMenus.data, []);
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
        <ElContainer>
          <ElHeader>{this._renderHeader()}</ElHeader>
          <ElContainer class="main-container">
            <ElAside>{this._renderMenu()}</ElAside>
            <ElMain>
              <router-view />
            </ElMain>
          </ElContainer>
        </ElContainer>
      </ElConfigProvider>
    );
  }
}
