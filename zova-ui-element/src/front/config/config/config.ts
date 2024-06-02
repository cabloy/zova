import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config = {
    base: {},
    api: {
      baseURL: process.env.API_BASE_URL,
      prefix: process.env.API_PREFIX,
    },
    layout: {},
  } as ZovaConfigOptional;

  // module config
  config.modules = {};

  return config;
}
