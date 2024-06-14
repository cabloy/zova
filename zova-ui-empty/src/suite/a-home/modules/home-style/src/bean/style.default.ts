import { BeanBase, Style, useComputed } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Style()
export class StyleDefault extends BeanBase<ScopeModule> {
  textCenter: string;
  buttonPrimary: string;

  protected async __init__() {
    this.textCenter = this.$style({ textAlign: 'center' });
    this.buttonPrimary = useComputed(() => {
      return this.$style({
        color: this.$token.color.primary,
        borderColor: this.$token.var.borderColor,
      });
    });
  }

  protected __dispose__() {}
}
