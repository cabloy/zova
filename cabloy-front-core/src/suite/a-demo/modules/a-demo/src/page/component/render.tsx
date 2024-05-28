import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerPageComponent } from './controller.js';
import { ScopeModule } from '../../resource/this.js';
import { NSControllerCard } from '../../resource/components.js';

export interface RenderPageComponent extends ControllerPageComponent {}

@Local()
export class RenderPageComponent extends BeanRenderBase<ScopeModule> {
  render() {
    const slots = {
      header: () => {
        return <div>this is a header slot from parent</div>;
      },
      default: () => {
        return <div>this is a default slot from parent</div>;
      },
      footer: () => {
        return <div>this is a footer slot from parent</div>;
      },
    } as NSControllerCard.Slots;
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
