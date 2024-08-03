import { BeanControllerBase, Local, Use, UseScope, PropsBase } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import type { ModelUser } from 'zova-module-home-user';
import { ScopeModule } from '../../resource/this.js';
import type { ModelTabs, ModelTabsOptions, ScopeModuleATabs } from 'zova-module-a-tabs';
import { RenderTabs } from './renderTabs.jsx';
import { RenderTheme } from './renderTheme.jsx';
import { RenderLocale } from './renderLocale.jsx';
import { RenderUser } from './renderUser.jsx';
import { RenderSidebar } from './renderSidebar.jsx';
import { RenderHeader } from './renderHeader.jsx';
import { RenderContent } from './renderContent.jsx';
import { RenderMenu } from './renderMenu.jsx';

export interface Props extends PropsBase<ControllerLayoutDefault, Slots> {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<ScopeModule, Props, Emits, Slots> {
  static $propsDefault = {};

  @UseScope('a-tabs')
  $$scopeModuleATabs: ScopeModuleATabs;

  @Use()
  $$modelMenu: ModelMenu;
  @Use('home-user.model.user')
  $$modelUser: ModelUser;
  @Use('a-tabs.model.tabs')
  $$modelTabs: ModelTabs;

  @Use()
  $$renderHeader: RenderHeader;
  @Use()
  $$renderContent: RenderContent;
  @Use()
  $$renderSidebar: RenderSidebar;
  @Use()
  $$renderMenu: RenderMenu;
  @Use()
  $$renderTabs: RenderTabs;
  @Use()
  $$renderTheme: RenderTheme;
  @Use()
  $$renderLocale: RenderLocale;
  @Use()
  $$renderUser: RenderUser;

  leftDrawerOpen: boolean = false;

  protected async __init__() {
    const configTabs = this.scope.config.tabs;
    const tabsOptions: ModelTabsOptions = {
      scene: configTabs.scene,
      max: configTabs.max,
      persister: configTabs.persister,
      getAffixTabs: () => {
        if (!this.$$modelMenu.select().data) return;
        return [{ key: '/a/home/home', affix: true }];
      },
      getTabInfo: async tab => {
        const queryMenu = this.$$modelMenu.select();
        if (!queryMenu.data && !queryMenu.isError) {
          await queryMenu.suspense();
        }
        if (queryMenu.isError) {
          throw queryMenu.error;
        }
        const menuItem = this.$$modelMenu.findMenuItem(tab.key);
        if (!menuItem) return undefined;
        return { title: menuItem.title, icon: menuItem.icon };
      },
    };
    await this.$$modelTabs.initialize(tabsOptions);
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
