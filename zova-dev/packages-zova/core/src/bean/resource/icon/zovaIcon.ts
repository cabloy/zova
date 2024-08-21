import { defineComponent, onServerPrefetch } from 'vue';
import { mergeProps, createVNode } from 'vue';
import { getZovaIcon } from './useZovaIcon.js';
import { useApp } from '../../../composables/useApp.js';

export const ZovaIcon = defineComponent({
  name: 'ZovaIcon',
  inheritAttrs: true,
  props: {
    name: String,
    href: String,
    width: [String, Number],
    height: [String, Number],
    color: String,
  },
  setup(props, _ref2) {
    const app = useApp();
    onServerPrefetch(async () => {
      const icon = props.name;
      if (icon === 'none' || !icon) {
        return;
      }
      await app.meta.icon.parseIconInfo(icon);
    });
    return () => {
      // icon info
      const iconInfo = getZovaIcon(props.name, app);
      // href
      let href = props.href;
      if (!href) {
        href = `#${iconInfo?.symbolId || ''}`;
      }
      // svgProps
      const svgProps = mergeProps(
        {
          class: 'zova-icon__svg',
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
