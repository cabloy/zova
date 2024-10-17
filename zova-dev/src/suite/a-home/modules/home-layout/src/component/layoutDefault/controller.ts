import { BeanControllerBase, Local, Use, UseScope, PropsBase, RequiredSome } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import { ModelAuth, ModelUser } from 'zova-module-home-user';
import { ScopeModule } from '../../.metadata/this.js';
import { ModelTabs, ModelTabsOptions, ScopeModuleATabs } from 'zova-module-a-tabs';

export interface Props extends PropsBase<ControllerLayoutDefault, Slots> {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<
  ScopeModule,
  RequiredSome<Props, keyof typeof ControllerLayoutDefault.$propsDefault>,
  Emits,
  Slots
> {
  static $propsDefault = {};

  @UseScope()
  $$scopeModuleATabs: ScopeModuleATabs;

  @Use()
  $$modelMenu: ModelMenu;
  @Use()
  $$modelAuth: ModelAuth;
  @Use()
  $$modelUser: ModelUser;
  @Use()
  $$modelTabs: ModelTabs;

  leftDrawerOpen: boolean = false;

  protected async __init__() {
    // tabs
    await this._initTabs();
    // user
    if (process.env.SERVER) {
      await this.$$modelUser.ensureUser();
    }
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
  }

  private async _initTabs() {
    const configTabs = this.scope.config.tabs;
    const tabsOptions: ModelTabsOptions = {
      scene: configTabs.scene,
      max: configTabs.max,
      persister: configTabs.persister,
      getAffixTabs: () => {
        if (!this.$$modelMenu.select().data) return;
        return [{ key: '/', affix: true }];
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
