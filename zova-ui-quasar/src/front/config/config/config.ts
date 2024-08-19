import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {};

  // routes
  config.routes = {
    path: {
      '/a/home/home': { alias: '/' },
    },
    name: {},
  };

  // modules
  config.modules = {};

  return config;
}
