import { BeanStyleBase, Local } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { style } from 'typestyle';

@Local()
export class StyleStyle extends BeanStyleBase<ScopeModule> {
  red = style({ color: Math.random() > 0.5 ? 'orange' : 'red' });
}
