import { Query } from '@tanstack/vue-query';
import { BeanSimple } from 'zova';

export class CookieWrapper extends BeanSimple {
  query: Query;

  protected __init__(query: Query) {
    this.query = query;
  }

  getItem(key: string): string | undefined {
    return this.app.meta.cookie.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.app.meta.cookie.setItem(key, value);
  }

  removeItem(key: string): void {
    this.app.meta.cookie.removeItem(key);
  }
}
