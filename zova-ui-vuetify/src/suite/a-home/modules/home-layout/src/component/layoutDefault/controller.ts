import { BeanControllerBase, Local } from 'zova';

export interface Props {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};

  leftDrawerOpen: boolean = false;
  menu: TypeMenuItem[];

  protected async __init__() {
    await this.loadMenu();
  }

  async loadMenu() {
    const res = await this.$api.get('/home/mock/getMenu');
    this.menu = res.data.data.filter(item => {
      if (!item.to) return true;
      return this.$router.checkPathValid(item.to);
    });
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
