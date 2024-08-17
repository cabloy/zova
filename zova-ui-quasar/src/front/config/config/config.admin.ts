// npm run build
// npm run build -- --flavor=admin
import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {};

  // module config
  config.modules = {};

  return config;
}
