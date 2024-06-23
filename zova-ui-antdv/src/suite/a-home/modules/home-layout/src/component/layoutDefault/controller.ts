import { BeanControllerBase, Local } from 'zova';

export interface Props {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$dataMenu: DataMenu;

  dataMenus: DataQuery<ServiceMenuEntity[]>;
  leftDrawerOpen: boolean = false;

  protected async __init__() {
    await this.loadMenu();
  }

  async loadMenu() {
    const res = await this.$api.get('/home/mock/getMenu');
    this.menu = res.data.data.filter((item: TypeMenuItem) => {
      if (item.children) {
        item.children = item.children.filter(item => {
          if (!item.to) return true;
          return this.$router.checkPathValid(item.to);
        });
        return item.children.length > 0;
      }
      if (!item.to) return true;
      return this.$router.checkPathValid(item.to);
    });
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
