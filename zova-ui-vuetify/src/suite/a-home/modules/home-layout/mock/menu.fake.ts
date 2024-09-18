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
    title: 'CSS-in-JS',
    caption: 'Style & Theme',
    icon: '',
    to: '/a/demo/style',
  },
  {
    folder: true,
    title: 'Vuetify',
  },
  {
    title: 'Docs',
    caption: 'vuetifyjs.com',
    icon: ':social:school',
    href: 'https://vuetifyjs.com',
  },
  {
    title: 'Github',
    caption: 'github.com/vuetifyjs',
    icon: ':editor:code',
    href: 'https://github.com/vuetifyjs',
  },
  {
    title: 'Vuetify Awesome',
    caption: 'Community Vuetify projects',
    icon: '::heart',
    href: 'https://github.com/vuetifyjs/awesome',
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
