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
    folder: true,
    title: 'Basic',
    children: [
      {
        title: 'State',
        caption: 'ref, computed',
        icon: '',
        to: '/demo/basic/state',
      },
      {
        title: 'Component',
        caption: 'props, emits, slots',
        icon: '',
        to: '/demo/basic/component',
      },
      {
        title: 'Route Query',
        caption: 'Typesafe',
        icon: '',
        to: '/demo/basic/routeQuery',
      },
      {
        title: 'Route Query(2)',
        caption: 'boolean, json, array',
        icon: '',
        to: '/demo/basic/routeQuery2',
      },
      {
        title: 'Route Params',
        caption: 'Typesafe',
        icon: '',
        to: { name: 'demo-basic:routeParams' },
      },
      {
        title: 'Locale',
        caption: 'I18n',
        icon: '',
        to: '/demo/basic/locale',
      },
      {
        title: 'CSS-in-JS',
        caption: 'Style & Theme',
        icon: '',
        to: '/demo/basic/style',
      },
      {
        title: 'Pinia',
        caption: '',
        icon: '',
        to: '/demo/basic/pinia',
      },
      {
        title: 'Legacy Vue3',
        caption: '',
        icon: '',
        to: '/demo/basic/legacy',
      },
      {
        title: 'Legacy Vue3(2)',
        caption: '',
        icon: '',
        to: '/legacy/counter',
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
        to: '/todo',
        //to: '/demo/todo/todo',
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
