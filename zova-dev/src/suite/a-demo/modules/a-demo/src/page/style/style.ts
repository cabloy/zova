import { style } from 'typestyle';
import { BeanStyleBase, Local, useComputed } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ControllerPageStyle } from './controller.js';

export interface StyleStyle extends ControllerPageStyle {}

@Local()
export class StyleStyle extends BeanStyleBase<ScopeModule> {
  textColor;
  protected async __init__() {
    this.textColor = useComputed(() => {
      return style({ $debugName: 'a-demo', color: this.active ? 'orange' : '' });
    });
  }
}
