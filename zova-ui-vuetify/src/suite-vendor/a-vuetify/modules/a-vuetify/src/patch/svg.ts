import { CabloyIcon } from 'zova';
import { defineComponent } from 'vue';
import { mergeProps as _mergeProps, createVNode as _createVNode } from 'vue';
import { makeIconProps } from 'vuetify/lib/composables/icons.mjs';

export const VSvgIconCabloy = defineComponent({
  name: 'VSvgIconCabloy',
  inheritAttrs: false,
  props: makeIconProps(),
  setup(props, _ref2) {
    const { attrs } = _ref2;
    return () => {
      return _createVNode(
        props.tag,
        _mergeProps(attrs, {
          style: null,
        }),
        {
          default: () => [
            _createVNode(CabloyIcon, {
              class: 'v-icon__svg',
              href: props.icon,
            }),
          ],
        },
      );
    };
  },
});
