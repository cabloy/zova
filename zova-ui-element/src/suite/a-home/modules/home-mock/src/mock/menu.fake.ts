import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

const __MenuData = [
  {
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/a/home/home',
  },
  {
    folder: true,
    title: 'Basic',
    children: [
      {
        title: 'State',
        caption: 'ref, computed',
        icon: '',
        to: '/a/demo/state',
      },
      {
        title: 'Component',
        caption: 'props, emits, slots',
        icon: '',
        to: '/a/demo/component',
      },
      {
        title: 'Style',
        caption: 'Style & Theme',
        icon: '',
        to: '/a/demo/style',
      },
    ],
  },
  {
    folder: true,
    title: 'Element',
    children: [
      {
        title: 'Docs',
        caption: 'element-plus.org',
        icon: ':social:school',
        href: 'https://element-plus.org',
      },
      {
        title: 'Github',
        caption: 'github.com/element-plus',
        icon: ':editor:code',
        href: 'https://github.com/element-plus',
      },
    ],
  },
];

export default defineFakeRoute([
  {
    url: '/home/mock/getMenu',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'Success',
        data: __MenuData,
      };
    },
  },
]);
