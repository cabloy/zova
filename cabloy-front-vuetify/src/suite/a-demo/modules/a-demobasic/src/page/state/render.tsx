import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageState } from './mother.js';
import { VBtn } from 'vuetify/components';

export interface RenderPageState extends MotherPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.counter}</div>
        <div>counter(computed): {this.counter2}</div>
        <VBtn color="secondary" onClick={() => this.inrement()}>
          Inrement
        </VBtn>
        <VBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </VBtn>
      </div>
    );
  }
}
