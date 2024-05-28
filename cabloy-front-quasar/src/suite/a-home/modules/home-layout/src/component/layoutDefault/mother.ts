import { BeanMotherBase, Local } from '@cabloy/front';
import * as MotherEssentialLink from '../../component/essentialLink/mother.js';

export interface Props {}

export type Emits = {};

export interface Slots {}

export type TypeMenuItem = MotherEssentialLink.Props & { folder?: boolean; separator?: boolean };

@Local()
export class MotherLayoutDefault extends BeanMotherBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};

  leftDrawerOpen: boolean = false;
  menu: TypeMenuItem[];

  protected async __init__() {
    await this.loadMenu();
  }

  async loadMenu() {
    const res = await this.$api.get('/a/homemock/getMenu');
    this.menu = res.data.data;
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
