import { createApp } from 'vue';
import router from './router.js';
import App from './app.vue';
import { zova } from './zova.js';

import '../css/settings.scss';

async function start({ app, router }) {
  await zova({ app, router });
  app.use(router);
  app.mount('#app');
}

const app = createApp(App);
start({ app, router });
