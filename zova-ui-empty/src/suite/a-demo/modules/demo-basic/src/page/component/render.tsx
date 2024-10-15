import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageComponent } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ZCard } from '../../index.js';
import { ZPage } from 'zova-module-home-base';

export interface RenderComponent extends ControllerPageComponent {}

@Local()
export class RenderComponent extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <ZPage>
        <ZCard
          controllerRef={ref => {
            this.cardRef = ref;
          }}
          header="header"
          content={this.resetTime.toString()}
          footer="footer"
          onReset={time => {
            this.resetTime = time;
          }}
          slots={{
            header: () => {
              return <div>this is a header slot from parent</div>;
            },
            default: () => {
              return <div>this is a default slot from parent</div>;
            },
            footer: () => {
              return <div>this is a footer slot from parent</div>;
            },
          }}
        ></ZCard>
      </ZPage>
    );
  }
}
