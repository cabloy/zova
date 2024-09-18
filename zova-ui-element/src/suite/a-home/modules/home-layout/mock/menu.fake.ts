import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

const __MenuData = [
  {
    key: '1',
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/',
    //to: '/home/index',
  },
  {
    key: '2',
    folder: true,
    title: 'Basic',
    children: [
      {
        key: '2-1',
        title: 'State',
        caption: 'ref, computed',
        icon: '',
        to: '/a/demo/state',
      },
      {
        key: '2-2',
        title: 'Component',
        caption: 'props, emits, slots',
        icon: '',
        to: '/a/demo/component',
      },
      {
        key: '2-3',
        title: 'CSS-in-JS',
        caption: 'Style & Theme',
        icon: '',
        to: '/a/demo/style',
      },
    ],
  },
  {
    key: '3',
    folder: true,
    title: 'Element',
    children: [
      {
        key: '3-1',
        title: 'Docs',
        caption: 'element-plus.org',
        icon: ':social:school',
        href: 'https://element-plus.org',
      },
      {
        key: '3-2',
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
