import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherLayoutDefault, TypeMenuItem } from './mother.js';
import { ElConfigProvider, ElMenu, ElMenuItem } from 'element-plus';
import { JSX } from 'vue/jsx-runtime';
//import EssentialLink from '../essentialLink/index.vue';

export interface RenderLayoutDefault extends MotherLayoutDefault { }

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(_item: TypeMenuItem) {
    return <ElMenuItem index="1">Navigator One</ElMenuItem>
    // if (item.separator) {
    //   return <VDivider></VDivider>;
    // }
    // if (item.folder) {
    //   return <VListSubheader>{item.title}</VListSubheader>;
    // }
    // return (
    //   <EssentialLink
    //     key={item.title}
    //     title={item.title}
    //     caption={item.caption}
    //     icon={item.icon}
    //     href={item.href}
    //     to={item.to}
    //   />
    // );
  }
  _renderMenu() {
    const domItems: JSX.Element[] = [];
    for (const item of this.menu) {
      domItems.push(this._renderMenuItem(item));
    }
    return <ElMenu class="el-menu-vertical-demo" collapse={this.leftDrawerOpen}>{domItems}</ElMenu>;
  }

  _renderHeader() {
    return (
      <ElMenu class="el-menu-demo" mode="horizontal">
        <ElMenuItem index="1">Element Plus</ElMenuItem>
      </ElMenu >
    )
  }

  _renderSidebar() {
    return
  }

  render() {
    return <ElConfigProvider>
      {this._renderHeader()}
      <div class="flex main-container">
        {this._renderMenu()}
        <router-view />
      </div>

    </ElConfigProvider>
  }
}
