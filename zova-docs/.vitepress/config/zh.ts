import { DefaultTheme, defineConfig } from 'vitepress';

export const zh = defineConfig({
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/zh/guide/start/introduction', activeMatch: '/zh/guide/' },
    ],
    sidebar: {
      '/zh/guide/': { base: '/zh/guide/', items: sidebarGuide() },
      '/zh/cabloy/': { base: '/zh/cabloy/', items: sidebarCabloy() },
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2016-present Zova`,
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
      text: '开始',
      items: [
        { text: '为什么需要Vue3+IOC', link: 'start/why' },
        { text: '简介', link: 'start/introduction' },
        { text: '快速上手', link: 'start/quick-start' },
        { text: 'VS Code 插件', link: 'start/zova-vscode' },
        { text: '框架升级', link: 'start/update' },
      ],
    },
    {
      collapsed: true,
      text: '基础',
      items: [
        {
          text: 'Vue组件',
          base: '/zh/guide/essentials/component/',
          items: [
            { text: '页面组件', link: 'page' },
            { text: '子组件', link: 'child' },
          ],
        },
        {
          text: '模块化体系',
          base: '/zh/guide/essentials/modularization/',
          items: [
            { text: '模块', link: 'module' },
            { text: '套件', link: 'suite' },
            { text: '目录结构', link: 'directory-structure' },
            { text: 'package.json', link: 'package' },
          ],
        },
        {
          text: 'IOC控制反转',
          base: '/zh/guide/essentials/ioc/',
          items: [
            { text: '简介', link: 'introduction' },
            { text: '匿名Bean', link: 'anonymous-bean' },
            { text: '具名Bean: Store', link: 'store-bean' },
            { text: '具名Bean: 通用', link: 'named-bean' },
            { text: '注入', link: 'inject' },
            { text: '注入(API)', link: 'inject-api' },
            { text: 'BeanBase基类', link: 'bean-base' },
            { text: '生命周期', link: 'lifecycle' },
          ],
        },
        {
          text: '模块Scope',
          base: '/zh/guide/essentials/scope/',
          items: [
            { text: '简介', link: 'introduction' },
            { text: 'Config配置', link: 'config' },
            { text: 'Constant常量', link: 'constant' },
            { text: 'I18n国际化', link: 'locale' },
            { text: 'Error错误异常', link: 'error' },
            { text: 'Vue子组件', link: 'component' },
            { text: 'Api服务', link: 'service' },
          ],
        },
      ],
    },
    {
      collapsed: true,
      text: '技术',
      items: [
        {
          text: '路由',
          base: '/zh/guide/techniques/router/',
          items: [
            { text: '路由字段', link: 'route-fields' },
            { text: '路由别名', link: 'route-alias' },
            { text: '导航守卫', link: 'navigation-guards' },
            { text: '路由Query', link: 'route-query' },
            { text: '路由Params', link: 'route-params' },
            { text: 'zod', link: 'zod' },
          ],
        },
        {
          text: 'Layout布局',
          base: '/zh/guide/techniques/layout/',
          link: 'introduction',
        },
        {
          text: 'API',
          base: '/zh/guide/techniques/api/',
          link: 'introduction',
        },
        {
          text: 'Mock',
          base: '/zh/guide/techniques/mock/',
          link: 'introduction',
        },
        {
          text: '图标',
          base: '/zh/guide/techniques/icon/',
          link: 'icon-engine',
        },
        {
          text: 'CSS-in-JS: 样式&主题',
          base: '/zh/guide/techniques/css-in-js/',
          items: [
            { text: '简介', link: 'introduction' },
            { text: '$style', link: 'style' },
            { text: '$class', link: 'class' },
            { text: '$token', link: 'token' },
            { text: '$theme', link: 'theme' },
          ],
        },
        {
          text: 'Model: 统一数据源',
          base: '/zh/guide/techniques/model/',
          items: [
            { text: '简介', link: 'introduction' },
            { text: '异步数据', link: 'async-data' },
            { text: '同步数据', link: 'sync-data' },
            { text: 'API', link: 'api' },
          ],
        },
        {
          text: 'Env环境变量',
          base: '/zh/guide/techniques/env/',
          link: 'introduction',
        },
        {
          text: 'Config配置',
          base: '/zh/guide/techniques/config/',
          link: 'introduction',
        },
        {
          text: '构建',
          base: '/zh/guide/techniques/build/',
          link: 'build',
        },
      ],
    },
    {
      collapsed: true,
      text: 'Vue生态支持',
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
      text: '资源',
      items: [
        { text: '常见问题', link: 'resources/faq' },
        { text: '视频', link: 'resources/videos' },
        { text: '文章', link: 'resources/articles' },
      ],
    },
    { text: '致谢', link: 'others/thanks' },
    { text: 'License', link: 'others/license' },
  ];
}

function sidebarCabloy(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Cabloy',
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
