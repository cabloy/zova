import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageComponent } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface RenderComponent extends ControllerPageComponent {}

@Local()
export class RenderComponent extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <this.scope.component.card
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
        ></this.scope.component.card>
      </div>
    );
  }
}
