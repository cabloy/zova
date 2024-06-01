import { ExtractComposable } from 'zova';
import { useAppProps } from 'ant-design-vue/es/app/context.js';

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $antdv: ExtractComposable<useAppProps>;
  }
}
