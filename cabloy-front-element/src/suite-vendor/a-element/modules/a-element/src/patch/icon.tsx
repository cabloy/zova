import { BeanBase, Local } from '@cabloy/front-core';
import { ElIcon } from 'element-plus';
import { useNamespace } from 'element-plus/es/hooks/use-namespace/index.mjs';
import { addUnit } from 'element-plus/es/utils/dom/style.mjs';
import { isUndefined } from 'element-plus/es/utils/types.mjs';
import { computed, createElementBlock, mergeProps, openBlock, renderSlot, unref } from 'vue';
import { ScopeModule } from '../resource/this.js';

@Local()
export class PatchIcon extends BeanBase<ScopeModule> {
  public async initialize() {
    this._patchSetup();
  }

  _patchSetup() {
    ElIcon.setup = function (props, { attrs, slots }) {
      const ns = useNamespace('icon');
      const style = computed(() => {
        const { size, color } = props;
        if (!size && !color)
          return {};
        return {
          fontSize: isUndefined(size) ? void 0 : addUnit(size),
          '--color': color
        };
      });
      return () => {
        return openBlock(), createElementBlock('i', mergeProps({
          class: unref(ns).b(),
          style: unref(style)
        }, attrs), [
          renderSlot(slots, 'default')
        ], 16);
      }
    };
  }
}
