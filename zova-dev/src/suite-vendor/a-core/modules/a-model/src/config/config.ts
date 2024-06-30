import { DefaultOptions, defaultShouldDehydrateQuery } from '@tanstack/vue-query';
import { ZovaApplication } from 'zova';

const defaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    gcTime: 1000 * 60 * 5,
  },
  dehydrate: {
    shouldDehydrateQuery(query) {
      if (query.meta?.ssr?.dehydrate === false) return false;
      return defaultShouldDehydrateQuery(query);
    },
  },
};

export const config = (_app: ZovaApplication) => {
  return {
    persister: {
      sync: {
        maxAge: Infinity,
      },
      async: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
    queryClientConfig: {
      defaultOptions,
    },
  };
};
