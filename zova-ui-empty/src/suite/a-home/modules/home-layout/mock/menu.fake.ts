import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

const __MenuData = [
  {
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/',
    //to: '/home/index',
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
    title: 'Github',
    caption: 'github.com/cabloy',
    icon: ':social:github',
    href: 'https://github.com/cabloy',
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
