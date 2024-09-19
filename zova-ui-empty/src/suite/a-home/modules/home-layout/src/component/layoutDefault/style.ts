import { BeanStyleBase, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class StyleLayoutDefault extends BeanStyleBase<ScopeModule> {
  cMenuList: string;

  protected async __init__() {
    this.cMenuList = this.$style({
      backgroundColor: 'whitesmoke',
      display: 'flex',
      $nest: {
        a: {
          display: 'flex',
          alignItems: 'center',
          padding: '6px',
        },
      },
    });
  }
}
