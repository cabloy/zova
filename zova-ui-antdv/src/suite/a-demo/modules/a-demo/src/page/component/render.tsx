import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageComponent } from './controller.js';
import { NSControllerCard } from '../../resource/components.js';
import { ScopeModule } from '../../resource/this.js';
export interface RenderComponent extends ControllerPageComponent {}

@Local()
export class RenderComponent extends BeanRenderBase<ScopeModule> {
  render() {
    const slots: NSControllerCard.Slots = {
      header: () => {
        return <div>this is a header slot from parent</div>;
      },
      default: () => {
        return <div>this is a default slot from parent</div>;
      },
      footer: () => {
        return <div>this is a footer slot from parent</div>;
      },
    };
    return (
      <div>
        <this.scope.component.card
          onControllerRef={ref => {
            this.cardRef = ref;
          }}
          header="header"
          content={this.resetTime.toString()}
          footer="footer"
          onReset={time => {
            this.resetTime = time;
          }}
          v-slots={slots}
        ></this.scope.component.card>
      </div>
    );
  }
}
