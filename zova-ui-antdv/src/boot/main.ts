import { createApp } from 'vue';
import App from './app/index.vue';
import { zova } from './zova.js';

import '../css/settings.scss';

async function start({ app }) {
  await zova({ app });
  app.mount('#app');
}

const app = createApp(App);
start({ app });
