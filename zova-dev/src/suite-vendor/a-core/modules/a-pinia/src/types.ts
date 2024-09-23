import { Functionable } from 'zova';
import { Pinia, StateTree } from 'pinia';

export type PiniaStore<P extends Functionable> = ReturnType<P>;

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $pinia: Pinia;
  }

  export interface SSRContextStateDefer {
    pinia: Record<string, StateTree>;
  }
}
