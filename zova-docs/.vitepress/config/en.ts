import { DefaultTheme, defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/start/introduction', activeMatch: '/guide/' },
    ],
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/cabloy/': { base: '/cabloy/', items: sidebarCabloy() },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2016-present Zova',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cabloy/zova' },
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
        { text: 'Why Vue3+IOC', link: 'start/why' },
        { text: 'Introduction', link: 'start/introduction' },
        { text: 'Quick Start', link: 'start/quick-start' },
        { text: 'Update', link: 'start/update' },
      ],
    },
    {
      collapsed: true,
      text: 'Essentials',
      items: [
        {
          text: 'Vue Component',
          base: '/guide/essentials/component/',
          items: [
            { text: 'Page Component', link: 'page' },
            { text: 'Child Component', link: 'child' },
          ],
        },
        {
          text: 'Modularization',
          base: '/guide/essentials/modularization/',
          items: [
            { text: 'Module', link: 'module' },
            { text: 'Suite', link: 'suite' },
            { text: 'Directory Structure', link: 'directory-structure' },
            { text: 'package.json', link: 'package' },
          ],
        },
        {
          text: 'IOC',
          base: '/guide/essentials/ioc/',
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Anonymous Bean', link: 'anonymous-bean' },
            { text: 'Named Bean: Store', link: 'store-bean' },
            { text: 'Named Bean: General', link: 'named-bean' },
            { text: 'Inject', link: 'inject' },
            { text: 'Inject(API)', link: 'inject-api' },
            { text: 'BeanBase', link: 'bean-base' },
            { text: 'Lifecycle', link: 'lifecycle' },
          ],
        },
        {
          text: 'Module Scope',
          base: '/guide/essentials/scope/',
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Config', link: 'config' },
            { text: 'Constant', link: 'constant' },
            { text: 'I18n', link: 'locale' },
            { text: 'Error Exception', link: 'error' },
            { text: 'Vue Child Component', link: 'component' },
            { text: 'Api Service', link: 'service' },
          ],
        },
      ],
    },
    {
      collapsed: true,
      text: 'Techniques',
      items: [
        {
          text: 'Router',
          base: '/guide/techniques/router/',
          items: [
            { text: 'Route Fields', link: 'route-fields' },
            { text: 'Navigation Guards', link: 'navigation-guards' },
            { text: 'Route Query', link: 'route-query' },
            { text: 'Route Params', link: 'route-params' },
            { text: 'zod', link: 'zod' },
          ],
        },
        {
          text: 'Layout',
          base: '/guide/techniques/layout/',
          link: 'introduction',
        },
        {
          text: 'API',
          base: '/guide/techniques/api/',
          link: 'introduction',
        },
        {
          text: 'Mock',
          base: '/guide/techniques/mock/',
          link: 'introduction',
        },
        {
          text: 'Icon',
          base: '/guide/techniques/icon/',
          link: 'icon-engine',
        },
        {
          text: 'CSS-in-JS: Style & Theme',
          base: '/guide/techniques/css-in-js/',
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: '$style', link: 'style' },
            { text: '$class', link: 'class' },
            { text: '$token', link: 'token' },
            { text: '$theme', link: 'theme' },
          ],
        },
        {
          text: 'Model: Unified Data Source',
          base: '/guide/techniques/model/',
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Async Data', link: 'async-data' },
            { text: 'Sync Data', link: 'sync-data' },
            { text: 'API', link: 'api' },
          ],
        },
        {
          text: 'Env',
          base: '/guide/techniques/env/',
          link: 'introduction',
        },
        {
          text: 'Config',
          base: '/guide/techniques/config/',
          link: 'introduction',
        },
        {
          text: 'Build',
          base: '/guide/techniques/build/',
          link: 'build',
        },
      ],
    },
    {
      collapsed: true,
      text: 'Vue Ecosystem Support',
      items: [
        { text: 'Pinia', link: 'vue/pinia' },
        { text: 'Composables', link: 'vue/composables' },
        { text: 'Provide/Inject', link: 'vue/provide-inject' },
        { text: 'Refs', link: 'vue/refs' },
        { text: 'v-model', link: 'vue/v-model' },
        { text: 'Others', link: 'vue/others' },
      ],
    },
    {
      text: 'Resources',
      items: [
        { text: 'FAQ', link: 'resources/faq' },
        { text: 'Videos', link: 'resources/videos' },
      ],
    },
    { text: 'Thanks', link: 'others/thanks' },
    { text: 'License', link: 'others/license' },
  ];
}

function sidebarCabloy(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Cabloy',
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
