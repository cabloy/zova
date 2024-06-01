/* eslint-disable */

import { App } from 'vue';
import { PluginZova } from 'zova';
import { modulesMeta } from '../../.zova/modules-meta.js';
import { AppMonkey } from '../front/config/monkey.js';
import { locales } from '../front/config/locales.js';
import config from '../../.zova/config.js';
import { Router } from 'vue-router';

export async function zova({ app, router }: { app: App; router: Router }) {
  app.provide('a-router:appRouter', router);
  await PluginZova.install(app, { modulesMeta, AppMonkey, locales, config });
}
