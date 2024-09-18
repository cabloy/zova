import { BeanStyleBase, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class StyleLayoutDefault extends BeanStyleBase<ScopeModule> {
  cMainContainer: string;
  cMenuVerticalDemo: string;

  protected async __init__() {
    this.cMainContainer = this.$style({
      height: 'calc(100vh - 60px)',
    });
    this.cMenuVerticalDemo = this.$style({
      height: 'calc(100vh - 60px)',
    });
  }
}
