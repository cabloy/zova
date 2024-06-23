/* eslint-disable */

import { App } from 'vue';
import { PluginZova } from 'zova';
import { modulesMeta } from '../../.zova/modules-meta.js';
import { AppMonkey } from '../front/config/monkey.js';
import { locales } from '../front/config/locales.js';
import config from '../../.zova/config.js';

export async function zova({ app }: { app: App }) {
  await PluginZova.install(app, { modulesMeta, AppMonkey, locales, config });
}
