import { BeanStyleBase, Local, useComputed } from 'zova';
import type { ControllerPageStyle } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface StyleStyle extends ControllerPageStyle {}

@Local()
export class StyleStyle extends BeanStyleBase<ScopeModule> {
  cTextColor: string;
  cBlock: string;

  protected async __init__() {
    this.cTextColor = useComputed(() => {
      return this.$style({ color: this.active ? this.$token.color.primary : '' });
    });
    this.cBlock = useComputed(() => {
      return this.$style({
        padding: '8px',
      });
    });
  }
}
