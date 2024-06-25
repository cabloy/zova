import { BeanControllerBase, Local, Use } from 'zova';
import { DataMenu } from '../../bean/data.menu.js';

export interface Props {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$dataMenu: DataMenu;

  leftDrawerOpen: boolean = false;

  protected async __init__() {}

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
