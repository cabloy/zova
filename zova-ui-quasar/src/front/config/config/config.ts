import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {
    base: {
      jwt: process.env.APP_BASE_JWT !== 'false',
    },
    api: {
      baseURL: process.env.API_BASE_URL,
      prefix: process.env.API_PREFIX,
    },
    ssr: {
      cookie: process.env.SSR_COOKIE === 'true',
    },
    layout: {},
  };

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
