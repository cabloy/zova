import Cookies from 'js-cookie';

export const cookieStorage = {
  getItem(key: string): string | undefined {
    return Cookies.get(key);
  },
  setItem(key: string, value: string): void {
    Cookies.set(key, value);
  },
  removeItem(key: string): void {
    Cookies.remove(key);
  },
};
