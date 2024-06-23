/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createApp } from 'vue';
import 'roboto-fontface/css/roboto/sass/roboto-fontface.scss';
import vuetify from './vuetify.js';
import App from './app/index.vue';
import { zova } from './zova.js';

async function start({ app }) {
  await zova({ app });
  app.mount('#app');
}

const app = createApp(App);
app.use(vuetify);
start({ app });
