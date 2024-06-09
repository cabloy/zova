import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';
import { Button } from 'ant-design-vue';

export interface RenderState extends ControllerPageState {}

@Local()
export class RenderState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>count(computed): {this.count2}</div>
        <Button onClick={() => this.increment()}>Increment</Button>
        <Button onClick={() => this.decrement()}>Decrement</Button>
      </div>
    );
  }
}
