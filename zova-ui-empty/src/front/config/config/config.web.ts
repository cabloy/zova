// FLAVOR=web npm run build
import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config = {
    base: {
      jwt: false,
    },
  } as ZovaConfigOptional;

  // module config
  config.modules = {};

  return config;
}
