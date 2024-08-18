// npm run build
// FLAVOR=app npm run build
import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {
    base: {
      jwt: true,
    },
  };

  // modules
  config.modules = {};

  return config;
}
