/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createApp } from 'vue';
import 'roboto-fontface/css/roboto/sass/roboto-fontface.scss';
import vuetify from './vuetify.js';
import router from './router.js';
import App from './app.vue';
import { zova } from './zova.js';

async function start({ app, router }) {
  await zova({ app, router });
  app.use(router);
  app.mount('#app');
}

const app = createApp(App);
app.use(vuetify);
start({ app, router });
