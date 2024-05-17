import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageState } from './mother.js';
import { ElButton } from 'element-plus';

export interface RenderPageState extends MotherPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>counter(computed): {this.count2}</div>
        <ElButton onClick={() => this.inrement()}>Inrement</ElButton>
        <ElButton onClick={() => this.decrement()}>Decrement</ElButton>
      </div>
    );
  }
}
