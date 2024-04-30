import { BeanMotherBase, Local, Use } from '@cabloy/front-core';
import { RenderLayoutDefault } from './render.jsx';
import * as MotherEssentialLink from '../../component/essentialLink/mother.js';

export interface Props {}

export type Emits = {};

export type Slots = {};

export type TypeMenuItem = MotherEssentialLink.Props & { folder?: boolean; separator?: boolean };

@Local()
export class MotherLayoutDefault extends BeanMotherBase<Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$render: RenderLayoutDefault;

  leftDrawerOpen: boolean = false;
  menu: TypeMenuItem[];

  protected async __init__() {
    await this.loadMenu();
  }

  async loadMenu() {
    const res = await this.$api.get('a/homemock/getMenu');
    this.menu = res.data.data;
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
