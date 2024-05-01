import { defineFakeRoute } from '@zhennann/vite-plugin-fake-server/client';

const __MenuData = [
  {
    title: 'Home',
    caption: '',
    icon: '::home',
    to: '/a/home/home',
  },
  {
    folder: true,
    title: 'Basic',
    children: [
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
    ],
  },
  {
    folder: true,
    title: 'Antdv',
    children: [
      {
        title: 'Docs',
        caption: 'antdv.com',
        icon: ':social:school',
        href: 'https://www.antdv.com',
      },
      {
        title: 'Github',
        caption: 'github.com/vueComponent',
        icon: ':editor:code',
        href: 'https://github.com/vueComponent/ant-design-vue',
      },
    ],
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
