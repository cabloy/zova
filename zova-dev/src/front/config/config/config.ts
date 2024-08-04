import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {
    base: {},
    api: {
      baseURL: process.env.API_BASE_URL,
      prefix: process.env.API_PREFIX,
    },
    layout: {},
  };

  // routes
  config.routes = {
    path: {
      '/a/home/home': { alias: '/' },
      '/demo/todo/todo': { alias: '/todo' },
    },
    name: {
      'demo-todo:item': { alias: '/todo/:id' },
    },
  };

  // module config
  config.modules = {};

  return config;
}
