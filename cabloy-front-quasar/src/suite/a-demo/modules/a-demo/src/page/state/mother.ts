import { BeanMotherPageBase, Local, useComputed } from '@cabloy/front';

@Local()
export class MotherPageState extends BeanMotherPageBase {
  count: number = 0;
  count2: string;

  protected async __init__() {
    this.count2 = useComputed(() => {
      return `=== ${this.count} ===`;
    });
  }

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
