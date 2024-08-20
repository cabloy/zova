import { App } from 'vue';
import { PluginBean } from 'zova';

export default async function ({ app }: { app: App }) {
  app.use(PluginBean);
}
