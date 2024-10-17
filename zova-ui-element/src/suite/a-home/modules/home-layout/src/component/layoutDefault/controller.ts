import { BeanControllerBase, Local, Use, PropsBase, useComputed, RequiredSome } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import * as TreeLodash from 'tree-lodash';
import { Tree } from 'tree-lodash/dist/esm/types.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ServiceMenuEntity } from '../../service/menu.js';

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

  @Use()
  $$modelMenu: ModelMenu;

  activeMenuItemKey: string;
  activeMenuSubKeys: string[];

  leftDrawerOpen: boolean = false;

  protected async __init__() {
    const route = useRoute();
    this.activeMenuItemKey = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return;
      return this._calcActiveMenuItemKey(data, route);
    });
    this.activeMenuSubKeys = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return [];
      return this._calcActiveMenuSubKeys(data);
    });
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
  }

  private _calcActiveMenuItemKey(menuItemsSrc: ServiceMenuEntity[], route: RouteLocationNormalizedLoaded) {
    const tree: Tree<'children'> = {
      key: '',
      children: menuItemsSrc,
    };
    const menuItem = TreeLodash.find(tree, menuItemSrc => {
      return menuItemSrc.to === route.path;
    });
    return menuItem?.key;
  }

  private _calcActiveMenuSubKeys(menuItemsSrc: ServiceMenuEntity[]) {
    const tree: Tree<'children'> = {
      key: '',
      children: menuItemsSrc,
    };
    const menuItem = TreeLodash.find(tree, menuItemSrc => {
      return menuItemSrc.children && !!menuItemSrc.children.find(item => this.activeMenuItemKey === item.key);
    });
    return menuItem ? [menuItem.key] : [];
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
