import { DefaultOptions, defaultShouldDehydrateQuery, StaleTime } from '@tanstack/vue-query';
import { CookieOptions, ZovaApplication } from 'zova';
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
      // mem query return true, because mem persister is false
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
    persister: {
      maxAge: {
        cookie: undefined as MaxAgeTime | undefined, // undefined: session cookie
        local: Infinity as MaxAgeTime,
        db: (1000 * 60 * 60 * 24) as number, // 24 hours
      },
      cookie: {
        options: {} as Omit<CookieOptions, 'expires'>,
      },
    },
    query: {
      staleTime: {
        async: 0 as StaleTime,
        ssr: Infinity as StaleTime,
      },
    },
    queryClientConfig: {
      defaultOptions,
    },
  };
};
