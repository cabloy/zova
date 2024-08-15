import { App } from 'vue';
import { PluginBean } from 'zova';

export default async function ({ app }: { app: App }) {
  app.use(PluginBean);
  if (process.env.CLIENT && document.body.getAttribute('data-server-rendered') !== null) {
    app.config.globalProperties.$q.dark.set((<any>window).__prefersColorSchemeDark);
  }
}
