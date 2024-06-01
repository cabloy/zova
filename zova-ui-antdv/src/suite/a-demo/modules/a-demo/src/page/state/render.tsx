import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';
import { Button } from 'ant-design-vue';

export interface RenderPageState extends ControllerPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>count(computed): {this.count2}</div>
        <Button onClick={() => this.inrement()}>Inrement</Button>
        <Button onClick={() => this.decrement()}>Decrement</Button>
      </div>
    );
  }
}
