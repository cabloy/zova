import { ExtractHook } from '@cabloy/front-core';
import { useAppProps } from 'ant-design-vue/es/app/context.js';
import { renderIcon } from './patch/icon.js';

declare module '@cabloy/front-core' {
  export interface BeanBase {
    $antdv: ExtractHook<useAppProps>;
    $icon: typeof renderIcon;
  }
}
