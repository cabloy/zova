import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';
import { QBtn } from 'quasar';

export interface RenderState extends ControllerPageState {}

@Local()
export class RenderState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <QBtn color="secondary" onClick={() => this.increment()}>
          Increment
        </QBtn>
        <QBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </QBtn>
      </div>
    );
  }
}
