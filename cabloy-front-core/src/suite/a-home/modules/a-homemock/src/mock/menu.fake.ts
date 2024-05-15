import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

const __MenuData = [
  {
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/a/home/home',
  },
  {
    title: 'State',
    caption: 'ref, computed',
    icon: '',
    to: '/a/demobasic/state',
  },
  {
    title: 'Component',
    caption: 'props, emits, slots',
    icon: '',
    to: '/a/demobasic/component',
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
    url: 'a/homemock/getMenu',
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
