/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createApp } from 'vue';
import { PluginBean } from 'zova';
import 'roboto-fontface/css/roboto/sass/roboto-fontface.scss';
import vuetify from './vuetify.js';
import App from './app/index.vue';

async function start({ app }) {
  app.use(PluginBean);
  app.mount('#app');
}

const app = createApp(App);
app.use(vuetify);
start({ app });
