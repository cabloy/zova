import { Functionable, ReturnTypeComposable } from '@cabloy/front';
import { Pinia } from 'pinia';

export type PiniaStoreLike<S, P extends Functionable> = S & ReturnTypeComposable<P>;

declare module '@cabloy/front' {
  export interface BeanBase {
    $pinia: Pinia;
  }
}
