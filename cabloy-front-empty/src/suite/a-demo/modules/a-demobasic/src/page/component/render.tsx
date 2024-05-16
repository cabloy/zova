import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageComponent } from './mother.js';
import { ScopeModule } from '../../resource/this.js';
import { NSMotherCard } from '../../resource/components.js';

export interface RenderPageComponent extends MotherPageComponent {}

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
    } as NSMotherCard.Slots;
    return (
      <div>
        <this.scope.component.card
          onMotherRef={ref => {
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
