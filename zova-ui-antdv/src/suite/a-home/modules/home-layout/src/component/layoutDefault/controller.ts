import { BeanControllerBase, Local, Use } from 'zova';
import { DataMenu } from '../../bean/data.menu.js';
import { ServiceMenuEntity } from '../../api/index.js';
import { DataQuery } from 'zova-module-a-data';

export interface Props {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$dataMenu: DataMenu;

  queryMenus: DataQuery<ServiceMenuEntity[]>;
  leftDrawerOpen: boolean = false;

  protected async __init__() {
    this.queryMenus = this.$$dataMenu.select();
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
