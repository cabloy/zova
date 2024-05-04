import { defineComponent } from 'vue';
import { mergeProps, createVNode } from 'vue';
import { useCabloyIcon } from './useCabloyIcon.js';

export const CabloyIcon = defineComponent({
  name: 'CabloyIcon',
  inheritAttrs: true,
  props: {
    name: String,
    href: String,
    width: [String, Number],
    height: [String, Number],
    color: String,
  },
  setup(props, _ref2) {
    const { iconInfo } = useCabloyIcon(() => props.name);
    return () => {
      // href
      let href = props.href;
      if (!href) {
        href = `#${iconInfo.value?.symbolId || ''}`;
      }
      // svgProps
      const svgProps = mergeProps(
        {
          class: 'cabloy-icon__svg',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          fill: 'currentColor',
          role: 'img',
          'aria-hidden': 'true',
        },
        {
          width: props.width,
          height: props.height,
          style: {
            color: props.color,
          },
        },
      );
      return createVNode('svg', svgProps, [
        createVNode(
          'use',
          {
            'xlink:href': href,
          },
          null,
        ),
      ]);
    };
  },
});
