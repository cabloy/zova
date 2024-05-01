import { BeanBase, Local } from '@cabloy/front-core';
import { ElIcon } from 'element-plus';
import { useNamespace } from 'element-plus/es/hooks/use-namespace/index.mjs';
import { addUnit } from 'element-plus/es/utils/dom/style.mjs';
import { isUndefined } from 'element-plus/es/utils/types.mjs';
import { Text, computed, createVNode, mergeProps, unref } from 'vue';
import { ScopeModule } from '../resource/this.js';
import { ElSvgIconCabloy } from './svg.js';

@Local()
export class PatchIcon extends BeanBase<ScopeModule> {
  public async initialize() {
    this._patchSetup();
  }

  _patchSetup() {
    const self = this;
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
        return createVNode('i', mergeProps({
          class: unref(ns).b(),
          style: unref(style)
        }, attrs), [
          self._renderSlotDefault(slots)
        ]);
      }
    };
  }

  private _renderSlotDefault(slots) {
    if (!slots.default) return null;
    const slotDefault = slots.default()[0];
    const type = slotDefault.type;
    if (typeof type !== 'string' && type !== Text) return slotDefault;
    const iconName = typeof type === 'string' ? type : slotDefault.children;
    const res = this._getCabloyIcon(iconName);
    if (res === undefined) return slotDefault;
    return <ElSvgIconCabloy icon={`#${res.icon || ''}`}></ElSvgIconCabloy>
  }

  private _getCabloyIcon(iconName) {
    // empty
    const iconEmpty = { icon: '' };
    // icon store
    const beanIcon = this.app.bean._getBeanSync('a-icon.store.icon');
    if (!beanIcon) return iconEmpty;
    // icon info
    const iconInfo = beanIcon.parseIconInfoSync(iconName);
    if (iconInfo === undefined) return undefined; // system handle
    // symbolId
    const symbolId = iconInfo.symbolId;
    if (symbolId === '') return iconEmpty;
    return { icon: symbolId };
  }
}
