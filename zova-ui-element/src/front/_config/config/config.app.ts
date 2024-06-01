// npm run build
// FLAVOR=app npm run build
import { ZovaConfigMeta, CabloyConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config = {
    base: {
      jwt: true,
    },
  } as CabloyConfigOptional;

  // module config
  config.modules = {};

  return config;
}
