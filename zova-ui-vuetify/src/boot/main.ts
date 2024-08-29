import { SSRContext } from 'zova';
import { App } from 'vue';
import vuetify from './vuetify.js';

import '../css/settings.scss';

export default (app: App, _ssrContext: SSRContext) => {
  app.use(vuetify);
};
