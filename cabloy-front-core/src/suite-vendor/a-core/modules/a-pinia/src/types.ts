import { Pinia } from 'pinia';

declare module '@cabloy/front' {
  export interface BeanBase {
    $pinia: Pinia;
  }
}
