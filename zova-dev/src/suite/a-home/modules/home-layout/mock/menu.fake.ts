import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

const __MenuData = [
  {
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/a/home/home',
  },
  {
    title: 'Github',
    caption: 'github.com/cabloy',
    icon: ':social:github',
    href: 'https://github.com/cabloy',
  },
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
    title: 'Locale',
    caption: '',
    icon: '',
    to: '/a/demo/locale',
  },
  {
    title: 'Style',
    caption: '',
    icon: '',
    to: '/a/demo/style',
  },
  {
    title: 'Todo',
    caption: '',
    icon: '',
    to: '/demo/todo/todo',
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
