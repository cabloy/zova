import { DefaultTheme, defineConfig } from 'vitepress';

export const zh = defineConfig({
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/zh/guide/start/introduction', activeMatch: '/zh/guide/' },
      { text: 'Cabloy-Pro', link: '/zh/cabloy-pro/start/introduction', activeMatch: '/zh/cabloy-pro/' },
    ],
    sidebar: {
      '/zh/guide/': { base: '/zh/guide/', items: sidebarGuide() },
      '/zh/cabloy-pro/': { base: '/zh/cabloy-pro/', items: sidebarCabloyPro() },
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2016-present 濮水大叔`,
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
      text: '开始',
      items: [
        { text: '简介', link: 'start/introduction' },
        { text: '快速上手', link: 'start/quick-start' },
      ],
    },
    {
      text: '模块化体系',
      items: [
        { text: '模块', link: 'modularization/module' },
        { text: '套件', link: 'modularization/suite' },
      ],
    },
    {
      text: '资源',
      items: [{ text: '视频', link: 'resources/videos' }],
    },
  ];
}

function sidebarCabloyPro(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Cabloy-Pro',
      items: [{ text: '简介', link: 'start/introduction' }],
    },
    {
      text: '资源',
      items: [
        { text: '视频', link: 'resources/videos' },
        {
          text: '文章',
          items: [
            { text: '比nestjs更优雅的ioc: 基础篇', link: 'resources/articles/ioc-basic' },
            { text: '比nestjs更优雅的ioc: 跨模块访问资源', link: 'resources/articles/ioc-cross-module' },
          ],
        },
      ],
    },
  ];
}
