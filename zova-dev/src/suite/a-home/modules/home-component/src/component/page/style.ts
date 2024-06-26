import { BeanStyleBase, Local } from 'zova';
import type { ControllerPage } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface StylePage extends ControllerPage {}

@Local()
export class StylePage extends BeanStyleBase<ScopeModule> {
  stylePage: string;

  protected async __init__() {
    this.stylePage = this.$style({
      padding: '16px',
    });
  }
}
