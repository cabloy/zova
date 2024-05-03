import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
  title: 'Cabloy-Front',
  description: 'A vue3 framework with ioc',
  base: '/cabloy-front/',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/cabloy/cabloy-front/edit/main/cabloy-docs/:path',
    },
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
  },
});
