import { createApp } from 'vue';
import { PluginBean } from 'zova';
import App from './app/index.vue';

import '../css/index.scss';
import 'uno.css';

async function start({ app }) {
  app.use(PluginBean);
  app.mount('#app');
}

const app = createApp(App);
start({ app });
