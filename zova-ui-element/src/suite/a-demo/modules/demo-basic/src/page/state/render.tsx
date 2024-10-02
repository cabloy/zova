import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';
import { ElButton } from 'element-plus';

export interface RenderState extends ControllerPageState {}

@Local()
export class RenderState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <ElButton onClick={() => this.increment()}>Increment</ElButton>
        <ElButton onClick={() => this.decrement()}>Decrement</ElButton>
      </div>
    );
  }
}
