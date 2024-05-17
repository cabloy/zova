import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageState } from './mother.js';
import { QBtn } from 'quasar';

export interface RenderPageState extends MotherPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>count(computed): {this.count2}</div>
        <QBtn color="secondary" onClick={() => this.inrement()}>
          Inrement
        </QBtn>
        <QBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </QBtn>
      </div>
    );
  }
}
