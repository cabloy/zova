import { ExtractComposable } from '@cabloy/front';
import { useAppProps } from 'ant-design-vue/es/app/context.js';

declare module '@cabloy/front' {
  export interface BeanBase {
    $antdv: ExtractComposable<useAppProps>;
  }
}
