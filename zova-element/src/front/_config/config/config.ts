import { CabloyConfigMeta, CabloyConfigOptional } from '@cabloy/front';

export default function (_meta: CabloyConfigMeta) {
  const config = {
    base: {},
    api: {
      baseURL: process.env.API_BASE_URL,
      prefix: process.env.API_PREFIX,
    },
    layout: {},
  } as CabloyConfigOptional;

  // module config
  config.modules = {};

  return config;
}
