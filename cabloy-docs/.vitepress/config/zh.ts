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
      text: '资源',
      items: [{ text: '视频', link: 'resources/videos' }],
    },
  ];
}

function sidebarCabloyPro(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '开始',
      items: [{ text: '简介', link: 'start/introduction' }],
    },
    {
      text: '资源',
      items: [
        { text: '视频', link: 'resources/videos' },
        { text: '文章', items: [{ text: '比nestjs更优雅的ioc', link: 'resources/articles/ioc' }] },
      ],
    },
  ];
}
