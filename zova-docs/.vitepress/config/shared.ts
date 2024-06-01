import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
  title: 'Cabloy-Front',
  description: 'A vue3 framework with ioc',
  base: '/',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/cabloy/zova/edit/main/zova-docs/:path',
    },
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
  },
  head: [
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1b6d37d42d29984a56d7a7eadc604e5a";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
        `,
    ],
  ],
});
