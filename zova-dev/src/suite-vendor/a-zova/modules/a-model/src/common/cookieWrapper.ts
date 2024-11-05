import { Query } from '@tanstack/vue-query';
import { BeanSimple, CookieOptions } from 'zova';
import { QueryMetaPersister, resolveMaxAgeTime } from '../types.js';
import { __ThisModule__ } from '../.metadata/this.js';

export class CookieWrapper extends BeanSimple {
  options: QueryMetaPersister;
  query: Query;

  protected __init__(options: QueryMetaPersister, query: Query) {
    this.options = options;
    this.query = query;
  }

  getItem(key: string): string | undefined {
    return this.app.meta.cookie.getItem(key);
  }

  setItem(key: string, value: string): void {
    const configScope = this.bean.scope(__ThisModule__).config;
    const opts: CookieOptions = { ...configScope.persister.cookie.options };
    let maxAge = resolveMaxAgeTime(this.options.maxAge, this.query);
    if (maxAge !== undefined) {
      if (maxAge === Infinity) maxAge = 1000 * 60 * 60 * 24 * 365;
      opts.expires = new Date(Date.now() + maxAge);
    }
    if (!opts.path) {
      opts.path = `/${this.app.config.env.appPublicPath || ''}`;
    }
    this.app.meta.cookie.setItem(key, value, opts);
  }

  removeItem(key: string): void {
    this.app.meta.cookie.removeItem(key);
  }
}
