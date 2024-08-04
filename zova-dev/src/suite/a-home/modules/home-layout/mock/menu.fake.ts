import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

const __MenuData = [
  {
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/',
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
        title: 'Route Query',
        caption: 'Typesafe',
        icon: '',
        to: '/a/demo/routeQuery',
      },
      {
        title: 'Route Query2',
        caption: 'boolean, json, array',
        icon: '',
        to: '/a/demo/routeQuery2',
      },
      {
        title: 'Route Params',
        caption: 'Typesafe',
        icon: '',
        to: { name: 'a-demo:routeParams' },
      },
      {
        title: 'Locale',
        caption: 'I18n',
        icon: '',
        to: '/a/demo/locale',
      },
      {
        title: 'CSS-in-JS',
        caption: 'Style & Theme',
        icon: '',
        to: '/a/demo/style',
      },
      {
        title: 'Pinia',
        caption: '',
        icon: '',
        to: '/a/demo/pinia',
      },
    ],
  },
  {
    folder: true,
    title: 'Business',
    children: [
      {
        title: 'Todo: CRUD',
        caption: 'Model: Unified Data Source',
        icon: '',
        to: '/demo/todo/todo',
      },
    ],
  },
  {
    folder: true,
    title: 'Zova',
    children: [
      {
        title: 'Docs',
        caption: 'zova.js.org',
        icon: ':social:school',
        href: 'https://zova.js.org',
      },
      {
        title: 'Github',
        caption: 'github.com/cabloy',
        icon: ':social:github',
        href: 'https://github.com/cabloy/zova',
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
