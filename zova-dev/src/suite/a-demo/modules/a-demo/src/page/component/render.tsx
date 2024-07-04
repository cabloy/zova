import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageComponent } from './controller.js';
import { ScopeModule } from '../../resource/this.js';
import { nextTick } from 'vue';

export interface RenderComponent extends ControllerPageComponent {}

@Local()
export class RenderComponent extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <this.$component.page>
        <this.scope.component.card
          controllerRef={ref => {
            this.cardRef = ref;
            console.log('cardRef.$props: ', this.cardRef?.$props);
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
        <label>Input: </label>
        <input
          type="text"
          class="input input-bordered w-full max-w-xs"
          ref={ref => {
            if (this.inputRef !== ref) {
              this.inputRef = ref as any;
              nextTick(() => {
                this.inputRef?.focus();
              });
            }
          }}
          value={this.resetTime.toString()}
        ></input>
      </this.$component.page>
    );
  }
}
