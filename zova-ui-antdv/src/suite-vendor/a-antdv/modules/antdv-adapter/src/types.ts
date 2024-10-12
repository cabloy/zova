import { UnwrapNestedRefs } from 'vue';
import { useAppProps } from 'ant-design-vue/es/app/context.js';
import 'zova';

declare module 'zova' {
  export interface BeanBase {
    $antdv: UnwrapNestedRefs<useAppProps>;
  }
}
