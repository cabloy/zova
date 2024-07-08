import { BeanControllerBase, Local, Use, UseScope, PropsBase } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import { ModelUser } from 'zova-module-home-user';
import { ScopeModule } from '../../resource/this.js';
import type { NSControllerRouterViewTabs, ScopeModuleATabs } from 'zova-module-a-tabs';
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
  @Use()
  $$modelUser: ModelUser;

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

  routerViewTabsRef: NSControllerRouterViewTabs.ControllerRouterViewTabs;
  leftDrawerOpen: boolean = false;

  protected async __init__() {}

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
