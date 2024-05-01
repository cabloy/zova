import { defineComponent } from 'vue';
import { createVNode } from 'vue';

export const ElSvgIconCabloy = defineComponent({
  name: 'ElSvgIconCabloy',
  inheritAttrs: false,
  props: {
    icon: String,
  },
  setup(props) {
    return () => {
      return createVNode(
        'svg',
        {
          class: 'el-icon-cabloy__svg',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          role: 'img',
          'aria-hidden': 'true',
        },
        [
          createVNode(
            'use',
            {
              'xlink:href': props.icon,
            },
            null,
          ),
        ],
      );
    };
  },
});
