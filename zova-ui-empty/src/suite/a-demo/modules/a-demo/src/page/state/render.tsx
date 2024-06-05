import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';

export interface RenderPageState extends ControllerPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>count(computed): {this.count2}</div>
        <button onClick={() => this.increment()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
