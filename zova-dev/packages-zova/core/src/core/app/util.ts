import { extend } from '@cabloy/extend';
import { BeanSimple } from '../../bean/beanSimple.js';
import { uuid as _uuid } from '../../utils/uuid.js';

export class AppUtil extends BeanSimple {
  getApiBaseURL() {
    let baseURL;
    if (process.env.SERVER) {
      baseURL = process.env.SSR_API_BASE_URL;
    } else {
      baseURL = this.app.config.api.baseURL || '';
    }
    baseURL = `${baseURL}${this.app.config.api.prefix || ''}`;
    return baseURL;
  }
}

export function uuid(): string {
  return _uuid();
}

export function isUuid(str: string): boolean {
  if (!str) return false;
  const length = str.length;
  return length === 36 || length === 32;
}

export function isNilOrEmptyString(str?: string | undefined | null): str is null | undefined | '' {
  return str === undefined || str === null || str === '';
}

export async function sleep(ms: number) {
  return new Promise(reslove => {
    window.setTimeout(() => {
      reslove(null);
    }, ms);
  });
}

export function deepExtend<T = any>(...args): T {
  return extend(true, ...args);
}
