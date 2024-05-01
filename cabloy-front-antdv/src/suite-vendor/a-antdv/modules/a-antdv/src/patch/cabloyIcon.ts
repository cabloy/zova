import { defineComponent } from 'vue';
import { mergeProps, createVNode } from 'vue';

export const CabloyIconSvgUse = defineComponent({
  name: 'CabloyIconSvgUse',
  inheritAttrs: false,
  props: {
    name: String,
    href: String,
    width: [String, Number],
    height: [String, Number],
    fill: String,
  },
  setup(props, _ref2) {

    return () => {
      // href
    let href=props.href;
    if()

      // svgProps
      const svgProps = mergeProps(
        {
          class: 'cabloy-icon__svg',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          role: 'img',
          'aria-hidden': 'true',
        },
        {
          width: props.width,
          height: props.height,
          fill: props.fill,
        },
      );
      return createVNode('svg', svgProps, [
        createVNode(
          'use',
          {
            'xlink:href': props.href,
          },
          null,
        ),
      ]);
    };
  },
});
