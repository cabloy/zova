// npm run build -- --flavor=app
import { CabloyConfigMeta, CabloyConfigOptional } from '@cabloy/front-core';

export default function (_meta: CabloyConfigMeta) {
  const config = {
    base: {
      jwt: true,
    },
  } as CabloyConfigOptional;

  // module config
  config.modules = {};

  return config;
}
