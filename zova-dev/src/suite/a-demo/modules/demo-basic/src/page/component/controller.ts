import { BeanControllerPageBase, Local, onControllerMounted } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';
import { ControllerCard } from '../../.metadata/index.js';

@Local()
export class ControllerPageComponent extends BeanControllerPageBase<ScopeModule> {
  resetTime: Date = new Date();
  cardRef?: ControllerCard;
  inputRef?: HTMLInputElement;

  protected async __init__() {
    onControllerMounted(() => {
      // this.inputRef?.focus();
    });
  }
}
