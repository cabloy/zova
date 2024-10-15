import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';
import { ZPage } from 'zova-module-home-base';

export interface RenderState extends ControllerPageState {}

@Local()
export class RenderState extends BeanRenderBase {
  render() {
    return (
      <ZPage>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <button onClick={() => this.increment()}>Increment</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </ZPage>
    );
  }
}
