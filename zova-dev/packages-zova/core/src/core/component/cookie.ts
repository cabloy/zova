import Cookies from 'js-cookie';
import { BeanSimple } from '../../bean/beanSimple.js';

export class AppCookie extends BeanSimple {
  getItem(key: string): string | undefined {
    return Cookies.get(key);
  }

  setItem(key: string, value: string): void {
    Cookies.set(key, value);
  }

  removeItem(key: string): void {
    Cookies.remove(key);
  }
}
