import { BeanBase, Style, useComputed } from 'zova';
import { ScopeModule } from '../.metadata/this.js';

@Style()
export class StyleDefault extends BeanBase<ScopeModule> {
  cTextCenter: string;
  cButtonPrimary: string;

  protected async __init__() {
    this.cTextCenter = this.$style({ textAlign: 'center' });
    this.cButtonPrimary = useComputed(() => {
      return this.$style({
        color: this.$token.color.primary,
        borderColor: this.$token.var.borderColor,
      });
    });
  }
}
