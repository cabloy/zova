import { Cast, SSRContext } from 'zova';
import { App } from 'vue';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.sass';

export default (app: App, ssrContext: SSRContext) => {
  const quasarUserOptions = {
    config: {
      dark: process.env.CLIENT ? window.ssr_local_themedark : undefined,
    },
  };
  Cast(app.use)(Quasar, quasarUserOptions, ssrContext);
};
