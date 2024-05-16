import { BeanMotherPageBase, Local, useComputed } from '@cabloy/front';

@Local()
export class MotherPageState extends BeanMotherPageBase {
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
