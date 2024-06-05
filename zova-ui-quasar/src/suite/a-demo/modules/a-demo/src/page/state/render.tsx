import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageState } from './controller.js';
import { QBtn } from 'quasar';

export interface RenderPageState extends ControllerPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>count(computed): {this.count2}</div>
        <QBtn color="secondary" onClick={() => this.increment()}>
          Inrement
        </QBtn>
        <QBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </QBtn>
      </div>
    );
  }
}
