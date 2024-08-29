import { Cast, SSRContext } from 'zova';
import { App } from 'vue';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.sass';
import '../css/app.scss';

export default (app: App, ssrContext: SSRContext) => {
  const quasarUserOptions = {
    config: {
      dark: process.env.CLIENT ? window.ssr_themedark : 'auto',
    },
  };
  Cast(app.use)(Quasar, quasarUserOptions, ssrContext);
};
