import { BeanBase, Style } from 'zova';
import { ScopeModule } from '../.metadata/this.js';

@Style()
export class StyleDefault extends BeanBase<ScopeModule> {
  cTextCenter: string;

  protected async __init__() {
    this.cTextCenter = this.$style({ textAlign: 'center' });
  }
}
