import { QueryMetaPersister, resolveMaxAgeTime } from '../../types.js';
import { experimental_createPersister } from '@tanstack/query-persist-client-core';
import { Query, QueryKey } from '@tanstack/vue-query';
import localforage from 'localforage';
import { SymbolBeanFullName } from 'zova';
import { BeanModelLast } from './bean.model.last.js';
import { CookieWrapper } from '../../common/cookieWrapper.js';

export class BeanModelPersister<TScopeModule = unknown> extends BeanModelLast<TScopeModule> {
  $persisterLoad<T>(queryKey: QueryKey): T | undefined {
    const query = this.self.$queryFind({ queryKey });
    if (!query) return undefined;
    const options = this._adjustPersisterOptions(query.meta?.persister);
    if (!options) return undefined;
    const storage = this._getPersisterStorage(options, query);
    if (!storage) return undefined;
    const storageKey = this._getPersisterStorageKey(options, query);
    try {
      const storedData = storage.getItem(storageKey);
      if (!storedData) return undefined;
      const persistedQuery = options.deserialize!(storedData as string);

      if (persistedQuery.state.dataUpdatedAt) {
        const queryAge = Date.now() - persistedQuery.state.dataUpdatedAt;
        const expired = queryAge > resolveMaxAgeTime(options.maxAge, query)!;
        const busted = persistedQuery.buster !== options.buster;
        if (expired || busted) {
          storage.removeItem(storageKey);
        } else {
          // Set proper updatedAt, since resolving in the first pass overrides those values
          query.setState({
            dataUpdatedAt: persistedQuery.state.dataUpdatedAt,
            errorUpdatedAt: persistedQuery.state.errorUpdatedAt,
          });
          return persistedQuery.state.data as T;
        }
      } else {
        storage.removeItem(storageKey);
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
        console.warn('Encountered an error attempting to restore query cache from persisted location.');
      }
      storage.removeItem(storageKey);
    }
  }

  $persisterSave(queryKey: QueryKey) {
    const query = this.self.$queryFind({ queryKey });
    if (!query) return;
    const options = this._adjustPersisterOptions(query.meta?.persister);
    if (!options) return;
    const storage = this._getPersisterStorage(options, query);
    if (!storage) return;
    const storageKey = this._getPersisterStorageKey(options, query);
    const data = options.serialize!({
      state: query.state,
      queryKey: query.queryKey,
      queryHash: query.queryHash,
      buster: options.buster,
    });
    if (options.sync === true) {
      storage.setItem(storageKey, data);
    } else {
      // Persist if we have storage defined, we use timeout to get proper state to be persisted
      setTimeout(() => {
        storage.setItem(storageKey, data);
      }, 0);
    }
  }

  $persisterRemove(queryKey: QueryKey) {
    const query = this.self.$queryFind({ queryKey });
    if (!query) return;
    const options = this._adjustPersisterOptions(query.meta?.persister);
    if (!options) return;
    const storage = this._getPersisterStorage(options, query);
    if (!storage) return;
    const storageKey = this._getPersisterStorageKey(options, query);
    if (options.sync === true) {
      storage.removeItem(storageKey);
    } else {
      // Persist if we have storage defined, we use timeout to get proper state to be persisted
      setTimeout(() => {
        storage.removeItem(storageKey);
      }, 0);
    }
  }

  protected _createPersister(options?: QueryMetaPersister | boolean) {
    options = this._adjustPersisterOptions(options);
    if (!options) return undefined;
    return experimental_createPersister({
      storage: this._getPersisterStorage(options) as any,
      maxAge: options.maxAge as number,
      prefix: options.prefix,
      buster: options.buster,
    });
  }

  protected _adjustPersisterOptions(options?: QueryMetaPersister | boolean) {
    if (options === false) return undefined;
    if (options === undefined || options === true) {
      options = {};
    } else {
      options = { ...options };
    }
    options.storage = options.storage ?? (options.sync ? 'local' : 'db');
    options.maxAge = options.maxAge ?? this.scopeSelf.config.maxAge[options.storage];
    options.prefix = options.prefix ?? this._getPersisterPrefix();
    options.buster = options.buster ?? this._getPersisterBuster();
    options.serialize = options.serialize ?? JSON.stringify;
    options.deserialize = options.deserialize ?? JSON.parse;
    return options;
  }

  protected _getPersisterStorageKey(options: QueryMetaPersister, query: Query) {
    if (['cookie', 'local'].includes(options.storage!)) return String(query.queryKey[query.queryKey.length - 1]);
    return `${options.prefix}-${query.queryHash}`;
  }

  protected _getPersisterStorage(options?: QueryMetaPersister | boolean, query?: Query) {
    options = this._adjustPersisterOptions(options);
    if (!options) return undefined;
    // cookie
    if (options.storage === 'cookie') return this.bean._newBeanSimple(CookieWrapper, false, query);
    // check server
    if (process.env.SERVER) return undefined;
    // local
    if (options.storage === 'local') return localStorage;
    // db
    if (options.storage === 'db') return localforage;
  }

  protected _getPersisterPrefix() {
    return `${this.app.config.env.appName}-query`;
  }

  protected _getPersisterBuster() {
    return this.app.config.env.appVersion;
  }

  protected _forceQueryKeyPrefix(queryKey?: QueryKey): QueryKey {
    if (!queryKey) queryKey = [];
    const prefix = queryKey[0];
    if (prefix && typeof prefix === 'string' && prefix.split('.').length === 3) return queryKey;
    return [this[SymbolBeanFullName]].concat(queryKey as any);
  }
}
