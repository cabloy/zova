import { BeanControllerBase, Local, Use, PropsBase, useComputed, useCustomRef } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import { ModelLayout } from '../../bean/model.layout.js';
import { ScopeModule } from '../../resource/this.js';

export interface Props extends PropsBase<ControllerLayoutDefault, Slots> {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<ScopeModule, Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$modelMenu: ModelMenu;
  @Use()
  $$modelLayout: ModelLayout;

  leftDrawerOpen: boolean;
  leftDrawerOpenMobile: boolean = false;
  belowBreakpoint: boolean;

  protected async __init__() {
    // belowBreakpoint
    this.belowBreakpoint = useComputed(() => {
      console.log(this.$q.screen.width);
      return this.$q.screen.width <= this.scope.config.layout.breakpoint;
    });
    // leftDrawerOpen
    this.leftDrawerOpen = useCustomRef(() => {
      const self = this;
      return {
        get() {
          return self.belowBreakpoint ? self.leftDrawerOpenMobile : self.$$modelLayout.leftDrawerOpenPC;
        },
        set(value) {
          self.belowBreakpoint ? (self.leftDrawerOpenMobile = value) : (self.$$modelLayout.leftDrawerOpenPC = value);
        },
      };
    });
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
