import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_app: ZovaApplication) {
  const config: ZovaConfigOptional = {
    layout: {
      sidebar: {
        leftOpenPC: false,
        breakpoint: 1023,
      },
    },
  };

  // modules
  config.modules = {};

  return config;
}
