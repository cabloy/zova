/* eslint-disable */

import { App } from 'vue';
import { PluginCabloy } from '@cabloy/front';
import { modulesMeta } from '../../.cabloy/modules-meta.js';
import { AppMonkey } from '../front/config/monkey.js';
import { locales } from '../front/config/locales.js';
import config from '../../.cabloy/config.js';
import { Router } from 'vue-router';

export async function cabloy({ app, router }: { app: App; router: Router }) {
  app.provide('a-router:appRouter', router);
  await PluginCabloy.install(app, { modulesMeta, AppMonkey, locales, config });
}
