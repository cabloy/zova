import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
  title: 'Zova',
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
        hm.src = "https://hm.baidu.com/hm.js?5831d5a43f8eb8e39e8329645f12b8ae";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
        `,
    ],
  ],
});
