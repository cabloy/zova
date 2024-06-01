// npm run build
// FLAVOR=app npm run build
import { CabloyConfigMeta, CabloyConfigOptional } from 'zova';

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
