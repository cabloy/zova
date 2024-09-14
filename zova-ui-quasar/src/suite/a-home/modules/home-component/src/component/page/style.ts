import { BeanStyleBase, Local } from 'zova';
import type { ControllerPage } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StylePage extends ControllerPage {}

@Local()
export class StylePage extends BeanStyleBase<ScopeModule> {
  cPage: string;

  protected async __init__() {
    this.cPage = this.$style({
      padding: '8px',
    });
  }
}
