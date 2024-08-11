import { Functionable } from 'zova';
import { Pinia } from 'pinia';

export type PiniaStore<P extends Functionable> = ReturnType<P>;

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $pinia: Pinia;
  }
}
