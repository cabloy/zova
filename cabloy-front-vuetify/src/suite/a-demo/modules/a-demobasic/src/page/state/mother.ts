import { BeanMotherPageBase, Local, Use, useComputed } from '@cabloy/front';
import { RenderPageState } from './render.jsx';

@Local()
export class MotherPageState extends BeanMotherPageBase {
  @Use()
  $$render: RenderPageState;

  counter: number = 0;
  counter2: string;

  protected async __init__() {
    this.counter2 = useComputed(() => {
      return `=== ${this.counter} ===`;
    });
  }

  inrement() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
