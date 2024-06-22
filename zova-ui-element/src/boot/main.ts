import { createApp } from 'vue';
import createRouter from './router.js';
import App from './app.vue';
import { zova } from './zova.js';

import '../css/index.scss';
import 'uno.css';

async function start({ app, router }) {
  await zova({ app, router });
  app.use(router);
  app.mount('#app');
}

const app = createApp(App);
start({ app, router: createRouter() });
