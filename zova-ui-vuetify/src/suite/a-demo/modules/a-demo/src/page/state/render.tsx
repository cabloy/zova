import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';
import { VBtn } from 'vuetify/components';

export interface RenderState extends ControllerPageState {}

@Local()
export class RenderState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <VBtn color="secondary" onClick={() => this.increment()}>
          Increment
        </VBtn>
        <VBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </VBtn>
      </div>
    );
  }
}
