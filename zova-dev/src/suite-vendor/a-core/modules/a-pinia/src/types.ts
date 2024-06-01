import { Functionable } from '@cabloy/front';
import { Pinia } from 'pinia';

export type PiniaStoreLike<S, P extends Functionable> = S & ReturnType<P>;

import '@cabloy/front';
declare module '@cabloy/front' {
  export interface BeanBase {
    $pinia: Pinia;
  }
}
