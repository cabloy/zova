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
