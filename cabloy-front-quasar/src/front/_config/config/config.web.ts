// npm run build
// FLAVOR=web npm run build
import { CabloyConfigMeta, CabloyConfigOptional } from '@cabloy/front-core';

export default function (_meta: CabloyConfigMeta) {
  const config = {
    base: {
      jwt: false,
    },
  } as CabloyConfigOptional;

  // module config
  config.modules = {};

  return config;
}
