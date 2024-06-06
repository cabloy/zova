// npm run build
// npm run build -- --flavor=app
import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {
    base: {
      jwt: true,
    },
  };

  // module config
  config.modules = {};

  return config;
}
