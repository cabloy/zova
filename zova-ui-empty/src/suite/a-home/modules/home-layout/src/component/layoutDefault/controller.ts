import { BeanControllerBase, Local, Use, PropsBase, RequiredSome } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';
import { ModelMenu } from '../../bean/model.menu.js';

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

  leftDrawerOpen: boolean = false;

  protected async __init__() {
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
