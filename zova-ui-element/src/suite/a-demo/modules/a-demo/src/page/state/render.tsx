import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';
import { ElButton } from 'element-plus';

export interface RenderPageState extends ControllerPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>count(computed): {this.count2}</div>
        <ElButton onClick={() => this.increment()}>Inrement</ElButton>
        <ElButton onClick={() => this.decrement()}>Decrement</ElButton>
      </div>
    );
  }
}
