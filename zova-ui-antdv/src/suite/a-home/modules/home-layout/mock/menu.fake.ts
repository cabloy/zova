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
        title: 'Style & Theme',
        caption: 'Style & Theme',
        icon: '',
        to: '/a/demo/style',
      },
    ],
  },
  {
    folder: true,
    title: 'Antdv',
    children: [
      {
        title: 'Docs',
        caption: 'antdv.com',
        icon: ':social:school',
        href: 'https://www.antdv.com',
      },
      {
        title: 'Github',
        caption: 'github.com/vueComponent',
        icon: ':editor:code',
        href: 'https://github.com/vueComponent/ant-design-vue',
      },
    ],
  },
];

export default defineFakeRoute([
  {
    url: '/home/layout/menu/select',
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
