import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

const __MenuData = [
  {
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/a/home/home',
  },
  {
    separator: true,
  },
  {
    folder: true,
    title: 'Basic',
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
    icon: ':editor:code',
    href: 'https://github.com/cabloy',
  },
];

export default defineFakeRoute([
  {
    url: '/api/a/homemock/getMenu',
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
