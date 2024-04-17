import { extend } from '@cabloy/extend';
import { BeanSimple } from '../../bean/beanSimple.js';
import uuid from 'uuid-random';

export class AppUtil extends BeanSimple {
  uuid(): string {
    return uuid();
  }

  isUuid(str: string): boolean {
    if (!str) return false;
    const length = str.length;
    return length === 36 || length === 32;
  }

  isNullOrEmptyString(str?: string | undefined | null): boolean {
    return str === undefined || str === null || str === '';
  }

  async sleep(ms: number) {
    return new Promise(reslove => {
      window.setTimeout(() => {
        reslove(null);
      }, ms);
    });
  }

  extend(...args) {
    return extend(true, ...args);
  }
}
