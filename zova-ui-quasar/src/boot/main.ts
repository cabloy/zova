import { SSRContext } from 'zova';
import { App } from 'vue';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.sass';

export default (app: App, ssrContext: SSRContext) => {
  const quasarUserOptions = {
    config: {
      dark: window.ssr_local_themedark,
    },
  };
  (<any>app.use)(Quasar, quasarUserOptions, ssrContext);
};
