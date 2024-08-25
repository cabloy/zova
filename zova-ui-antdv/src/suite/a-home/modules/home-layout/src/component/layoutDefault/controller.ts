import { BeanControllerBase, Local, Use, PropsBase, useComputed, iconh } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import { ItemType } from 'ant-design-vue';
import { ServiceMenuEntity } from '../../api/interface/menu.js';
import { useRoute } from 'vue-router';
import { map } from 'tree-lodash';
import { Tree } from 'tree-lodash/dist/esm/types.js';
import { MenuItemGroupType, MenuItemType } from 'ant-design-vue/es/menu/src/interface.js';

export interface Props extends PropsBase<ControllerLayoutDefault, Slots> {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$modelMenu: ModelMenu;

  menuTree?: MenuItemGroupType;

  activeMenuItemKey: string;

  protected async __init__() {
    const route = useRoute();
    // menuTree
    this.menuTree = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return;
      return this._prepareMenuItems(data);
    });
    this.activeMenuItemKey = useComputed(() => {
      return route.path;
    });
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
  }

  private _prepareMenuItems(menuItemsSrc: ServiceMenuEntity[]): MenuItemGroupType {
    const tree: Tree<'children'> = {
      key: '',
      children: menuItemsSrc,
    };
    return map(tree, (menuItemSrc, meta) => {
      if (meta.depth === 0) return { key: menuItemSrc.key };
      // key
      const menuItem = {
        key: menuItemSrc.key,
        icon: () => iconh(menuItemSrc.icon as any),
        label: menuItemSrc.title,
        title: menuItemSrc.title,
        data: menuItemSrc,
      };
      return menuItem;
    }) as MenuItemGroupType;
  }

  onMenuItemClick(event) {
    const data: ServiceMenuEntity = event.item.data;
    if (data.href) {
      window.open(data.href);
    } else {
      this.$router.push(data.to!);
    }
  }
}
