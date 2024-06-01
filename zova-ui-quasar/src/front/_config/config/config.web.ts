// npm run build -- --flavor=web
import { CabloyConfigMeta, CabloyConfigOptional } from 'zova';

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
