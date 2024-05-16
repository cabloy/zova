import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageState } from './mother.js';
import { ElButton } from 'element-plus';

export interface RenderPageState extends MotherPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.counter}</div>
        <div>counter(computed): {this.counter2}</div>
        <ElButton onClick={() => this.inrement()}>Inrement</ElButton>
        <ElButton onClick={() => this.decrement()}>Decrement</ElButton>
      </div>
    );
  }
}
