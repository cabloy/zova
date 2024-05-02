import { defineConfig } from 'vitepress';

export const zh = defineConfig({
  lang: 'zh-CN',
  description: '',
  themeConfig: {
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2016-present 濮水大叔`,
    },
  },
});
