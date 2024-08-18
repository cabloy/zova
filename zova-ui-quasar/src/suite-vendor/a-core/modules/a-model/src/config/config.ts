import { DefaultOptions, defaultShouldDehydrateQuery, StaleTime } from '@tanstack/vue-query';
import { ZovaApplication } from 'zova';
import { MaxAgeTime } from '../types.js';

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
      if (typeof query.meta?.persister === 'object' && query.meta?.persister?.sync) return false;
      return defaultShouldDehydrateQuery(query);
    },
    shouldDehydrateMutation(_mutation) {
      return false;
    },
  },
};

export const config = (_app: ZovaApplication) => {
  return {
    maxAge: {
      cookie: undefined as MaxAgeTime | undefined, // undefined: session cookie
      local: Infinity as MaxAgeTime,
      db: (1000 * 60 * 60 * 24) as number, // 24 hours
    },
    staleTime: {
      async: 0 as StaleTime,
      ssr: Infinity as StaleTime,
    },
    queryClientConfig: {
      defaultOptions,
    },
  };
};
