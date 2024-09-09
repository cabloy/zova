import { BeanBase, Style } from 'zova';
import { ScopeModule } from '../.metadata/this.js';

@Style()
export class StyleDefault extends BeanBase<ScopeModule> {
  textCenter: string;

  protected async __init__() {
    this.textCenter = this.$style({ textAlign: 'center' });
  }

  protected __dispose__() {}
}
