import { ExtractHook, renderIcon } from '@cabloy/front';
import { useAppProps } from 'ant-design-vue/es/app/context.js';

declare module '@cabloy/front-core' {
  export interface BeanBase {
    $antdv: ExtractHook<useAppProps>;
    $iconh: typeof renderIcon;
  }
}
