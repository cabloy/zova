import { ZovaApplication, ZovaConfigOptional } from 'zova';

export default function (_app: ZovaApplication) {
  const config: ZovaConfigOptional = {};

  // routes
  config.routes = {
    path: {
      '/home/index': { alias: '/' },
    },
    name: {},
  };

  // modules
  config.modules = {};

  return config;
}
