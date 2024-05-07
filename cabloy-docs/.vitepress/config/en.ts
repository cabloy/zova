import { DefaultTheme, defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/start/introduction', activeMatch: '/guide/' },
      { text: 'Cabloy-Pro', link: '/cabloy-pro/start/introduction', activeMatch: '/cabloy-pro/' },
    ],
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/cabloy-pro/': { base: '/cabloy-pro/', items: sidebarCabloyPro() },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2016-present zhennann',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cabloy/cabloy-front' },
      { icon: 'x', link: 'https://twitter.com/zhennann2024' },
      { icon: 'youtube', link: 'https://www.youtube.com/@cabloyjs' },
    ],
  },
});

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: 'start/introduction' },
        { text: 'Quick Start', link: 'start/quick-start' },
      ],
    },
    {
      text: 'Essentials',
      items: [
        {
          text: 'Modularization',
          base: '/guide/essentials/modularization/',
          items: [
            { text: 'Module', link: 'module' },
            { text: 'Suite', link: 'suite' },
          ],
        },
        {
          text: 'IOC',
          base: '/guide/essentials/ioc/',
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Local Bean', link: 'local-bean' },
            { text: 'Store Bean', link: 'store-bean' },
            { text: 'BeanBase', link: 'bean-base' },
            { text: 'Lifecycle', link: 'lifecycle' },
          ],
        },
        {
          text: 'Vue Component',
          base: '/guide/essentials/component/',
          items: [
            { text: 'Page Component', link: 'page' },
            { text: 'Child Component', link: 'child' },
          ],
        },
      ],
    },
    {
      text: 'Resources',
      items: [{ text: 'Videos', link: 'resources/videos' }],
    },
  ];
}

function sidebarCabloyPro(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Cabloy-Pro',
      items: [{ text: 'Introduction', link: 'start/introduction' }],
    },
    {
      text: 'Resources',
      items: [
        { text: 'Videos', link: 'resources/videos' },
        {
          text: 'Articles',
          items: [
            { text: 'A more elegant ioc than nestjs: Basics', link: 'resources/articles/ioc-basic' },
            {
              text: 'A more elegant ioc than nestjs: Cross Module Access',
              link: 'resources/articles/ioc-cross-module',
            },
          ],
        },
      ],
    },
  ];
}
