import { defineConfig } from 'vitepress';
import { shared } from './shared.js';
import { en } from './en.js';
import { zh } from './zh.js';

export default defineConfig({
  ...shared,
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh },
  },
});
