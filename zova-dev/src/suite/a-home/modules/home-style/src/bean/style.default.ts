import { BeanBase, Style } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Style()
export class StyleDefault extends BeanBase<ScopeModule> {
  textCenter: string;
  buttonPrimary: string;

  protected async __init__() {
    this.textCenter = this.$style({ textAlign: 'center' });
    this.buttonPrimary = this.$style({ color: this.$token.colorPrimary });
  }

  protected __dispose__() {}
}
