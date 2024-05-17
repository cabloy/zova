import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageState } from './mother.js';
import { Button } from 'ant-design-vue';

export interface RenderPageState extends MotherPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.count}</div>
        <div>counter(computed): {this.counter2}</div>
        <Button onClick={() => this.inrement()}>Inrement</Button>
        <Button onClick={() => this.decrement()}>Decrement</Button>
      </div>
    );
  }
}
