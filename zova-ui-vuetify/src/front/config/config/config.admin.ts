import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {
    layout: {
      sidebar: {
        leftOpenPC: true,
        breakpoint: 1023,
      },
    },
  };

  // modules
  config.modules = {};

  return config;
}
