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
    to: '/a/demo/state',
  },
  {
    title: 'Component',
    caption: 'props, emits, slots',
    icon: '',
    to: '/a/demo/component',
  },
  {
    folder: true,
    title: 'Quasar',
  },
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: ':social:school',
    href: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: ':editor:code',
    href: 'https://github.com/quasarframework',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: '::heart',
    href: 'https://awesome.quasar.dev',
  },
];

export default defineFakeRoute([
  {
    url: '/a/homemock/getMenu',
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
