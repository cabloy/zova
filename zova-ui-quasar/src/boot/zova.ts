/* eslint-disable */
//import { boot } from 'quasar/wrappers';
import { App } from 'vue';
import { PluginZova } from 'zova';
import { modulesMeta } from '../../.quasar/zova/modules-meta.js';
import { AppMonkey } from '../front/config/monkey.js';
import { locales } from '../front/config/locales.js';
import config from '../../.quasar/zova/config.js';

export default async function ({ app }: { app: App }) {
  await PluginZova.install(app, { modulesMeta, AppMonkey, locales, config });
}
