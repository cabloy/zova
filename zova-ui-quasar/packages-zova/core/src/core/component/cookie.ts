import { BeanSimple } from '../../bean/beanSimple.js';
import { CookieOptions } from '../../types/index.js';

export class AppCookie extends BeanSimple {
  getItem(key: string): string | undefined {
    return Cookies.get(key);
  }

  setItem(key: string, value: string, options?: CookieOptions): void {
    Cookies.set(key, value, options);
  }

  removeItem(key: string, options?: CookieOptions): void {
    Cookies.remove(key, options);
  }
}
