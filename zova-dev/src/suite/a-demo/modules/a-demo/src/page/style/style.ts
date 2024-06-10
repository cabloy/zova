import { BeanStyleBase, Local, useComputed } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ControllerPageStyle } from './controller.js';

export interface StyleStyle extends ControllerPageStyle {}

@Local()
export class StyleStyle extends BeanStyleBase<ScopeModule> {
  textColor: string;
  
  protected async __init__() {
    this.textColor = useComputed(() => {
      return this.$style({ color: this.active ? 'orange' : '' });
    });
  }
}
