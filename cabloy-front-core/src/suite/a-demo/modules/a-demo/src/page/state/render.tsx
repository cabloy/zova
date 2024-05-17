import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageState } from './mother.js';

export interface RenderPageState extends MotherPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.count}</div>
        <div>counter(computed): {this.count2}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
