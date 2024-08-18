import { Query } from '@tanstack/vue-query';
import { BeanSimple, CookieOptions } from 'zova';
import { QueryMetaPersister, resolveMaxAgeTime } from '../types.js';

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
    const opts: CookieOptions = {};
    const maxAge = resolveMaxAgeTime(this.options.maxAge, this.query);
    if (maxAge !== undefined) {
      opts.expires = new Date(Date.now() + maxAge);
    }
    this.app.meta.cookie.setItem(key, value, opts);
  }

  removeItem(key: string): void {
    this.app.meta.cookie.removeItem(key);
  }
}
