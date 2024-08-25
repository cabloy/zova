import { BeanControllerBase, Local, Use, PropsBase, useComputed, iconh } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import { ItemType } from 'ant-design-vue';
import { ServiceMenuEntity } from '../../api/interface/menu.js';
import { SubMenuType } from 'ant-design-vue/es/menu/src/interface.js';

export interface Props extends PropsBase<ControllerLayoutDefault, Slots> {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$modelMenu: ModelMenu;

  menuItems?: ItemType[];

  protected async __init__() {
    // menuItems
    this.menuItems = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return;
      return this._prepareMenuItems(data);
    });
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
  }

  private _prepareMenuItems(menuItemsSrc: ServiceMenuEntity[], levels: number[] = []): ItemType[] {
    const menuItems: ItemType[] = [];
    for (let index = 0; index < menuItemsSrc.length; index++) {
      const menuItemSrc = menuItemsSrc[index];
      // key
      const _levels = levels.concat(index + 1);
      const key = _levels.join('-');
      const menuItem: ItemType = {
        key,
        icon: () => iconh(menuItemSrc.icon as any),
        label: menuItemSrc.title,
        title: menuItemSrc.title,
      };
      if (menuItemSrc.folder) {
        (<SubMenuType>menuItem).children = this._prepareMenuItems(menuItemSrc.children!, _levels);
      }
      menuItems.push(menuItem);
    }
    return menuItems;
  }
}
