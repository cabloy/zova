import { createApp } from 'vue';
import { PluginBean } from 'zova';
import App from './app/index.vue';

import '../css/settings.scss';

async function start({ app }) {
  app.use(PluginBean);
  app.mount('#app');
}

const app = createApp(App);
start({ app });
