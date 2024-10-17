import { BeanControllerBase, Local, Use, PropsBase, useComputed, useCustomRef, RequiredSome } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import { ModelLayout } from '../../bean/model.layout.js';
import { ScopeModule } from '../../.metadata/this.js';

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
  @Use()
  $$modelLayout: ModelLayout;

  leftDrawerOpen: boolean;
  leftDrawerOpenMobile: boolean = false;
  belowBreakpoint: boolean;

  protected async __init__() {
    // belowBreakpoint
    this.belowBreakpoint = useComputed(() => {
      let width;
      if (process.env.SERVER) {
        width = this.$q.screen.width;
      } else {
        width = this.$q.screen.width || document.documentElement.clientWidth;
      }
      return width <= this.app.config.layout.sidebar.breakpoint;
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
