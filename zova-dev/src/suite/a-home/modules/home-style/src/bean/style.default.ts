import { BeanBase, Style } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Style()
export class StyleDefault extends BeanBase<ScopeModule> {
  hello: string = 'a';

  protected async __init__() {}

  protected __dispose__() {}
}
