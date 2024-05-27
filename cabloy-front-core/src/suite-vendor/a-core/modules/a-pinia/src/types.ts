import { Functionable, ReturnTypeHook } from '@cabloy/front';
import { Pinia } from 'pinia';

export type PiniaStoreLike<S, P extends Functionable> = S & ReturnTypeHook<P>;

declare module '@cabloy/front' {
  export interface BeanBase {
    $pinia: Pinia;
  }
}
