import { BeanBase, ZovaIcon, getZovaIcon, Local } from 'zova';
import { useNamespace } from 'element-plus/es/hooks/use-namespace/index.mjs';
import { addUnit } from 'element-plus/es/utils/dom/style.mjs';
import { isUndefined } from 'element-plus/es/utils/types.mjs';
import { Text, computed, createVNode, mergeProps, unref } from 'vue';
import { ScopeModule } from '../resource/this.js';
import { ElIcon } from 'element-plus';

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
        if (!size && !color) return {};
        return {
          fontSize: isUndefined(size) ? void 0 : addUnit(size),
          '--color': color,
        };
      });
      return () => {
        return createVNode(
          'i',
          mergeProps(
            {
              class: unref(ns).b(),
              style: unref(style),
            },
            attrs,
          ),
          [self._renderSlotDefault(slots)],
        );
      };
    };
  }

  private _renderSlotDefault(slots) {
    if (!slots.default) return null;
    const slotDefault = slots.default()[0];
    const type = slotDefault.type;
    if (typeof type !== 'string' && type !== Text) return slotDefault;
    const iconName = typeof type === 'string' ? type : slotDefault.children;
    const iconInfo = getZovaIcon(iconName, this.app);
    if (iconInfo === undefined) return slotDefault;
    return <ZovaIcon href={`#${iconInfo.symbolId}`}></ZovaIcon>;
  }
}
