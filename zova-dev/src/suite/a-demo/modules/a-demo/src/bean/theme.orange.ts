import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Theme()
export class ThemeOrange extends BeanBase<ScopeModule> {
  protected async __init__() {}

  protected __dispose__() {}
}
