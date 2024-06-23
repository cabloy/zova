import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VBtn,
  VDivider,
  VList,
  VListSubheader,
  VMain,
  VNavigationDrawer,
  VSpacer,
  VToolbarTitle,
} from 'vuetify/components';
import { JSX } from 'vue/jsx-runtime';
import EssentialLink from '../essentialLink/index.vue';
import { ServiceMenuEntity } from '../../api/index.js';

export interface RenderLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ServiceMenuEntity) {
    if (item.separator) {
      return <VDivider></VDivider>;
    }
    if (item.folder) {
      return <VListSubheader>{item.title}</VListSubheader>;
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
    if (this.queryMenus.isLoading || !this.queryMenus.data) return;
    const domItems: JSX.Element[] = [];
    for (const item of this.queryMenus.data) {
      domItems.push(this._renderMenuItem(item));
    }
    return <VList>{domItems}</VList>;
  }

  render() {
    return (
      <VApp>
        <VNavigationDrawer v-model={this.leftDrawerOpen} width="360">
          {this._renderMenu()}
        </VNavigationDrawer>
        <VAppBar>
          <VAppBarNavIcon icon="::menu" variant="text" onClick={() => this.toggleLeftDrawer()}></VAppBarNavIcon>
          <VToolbarTitle>Zova</VToolbarTitle>
          <VSpacer></VSpacer>
          <VBtn icon="::search" variant="text"></VBtn>
          <VBtn icon="::more-horiz" variant="text"></VBtn>
        </VAppBar>
        <VMain>
          <router-view />
        </VMain>
      </VApp>
    );
  }
}
