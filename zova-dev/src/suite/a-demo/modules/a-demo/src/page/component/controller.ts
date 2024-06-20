import { BeanControllerPageBase, Local, onControllerMounted } from 'zova';
import { ControllerCard } from '../../component/card/controller.js';
import { ScopeModule } from '../../resource/this.js';

@Local()
export class ControllerPageComponent extends BeanControllerPageBase<ScopeModule> {
  resetTime: Date = new Date();
  cardRef?: ControllerCard;
  inputRef?: HTMLInputElement;

  protected async __init__() {
    onControllerMounted(() => {
      this.inputRef?.focus();
    });
  }
}
