import { Functionable } from 'zova';
import { Pinia } from 'pinia';

export type PiniaStoreLike<S, P extends Functionable> = S & ReturnType<P>;

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $pinia: Pinia;
  }
}
