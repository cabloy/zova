import { ZovaApplication, ZovaConfigOptional } from 'zova';

export default function (_app: ZovaApplication) {
  const config: ZovaConfigOptional = {};

  // routes
  config.routes = {
    path: {
      '/home/index': { alias: '/' },
      '/home/user/login': { alias: '/login' },
      '/demo/todo/todo': { alias: '/todo' },
    },
    name: {
      'demo-todo:item': { alias: '/todo/:id' },
    },
  };

  // modules
  config.modules = {};

  return config;
}
