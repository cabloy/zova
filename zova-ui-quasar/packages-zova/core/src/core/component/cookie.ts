// from: quasar/ui/src/plugins/Cookies.js
import { BeanSimple } from '../../bean/beanSimple.js';
import { Cast, CookieOptions } from '../../types/index.js';

export class AppCookie extends BeanSimple {
  getItem(key: string): string | undefined;
  getItem(key?: undefined | null): Record<string, string>;
  getItem(key?: string | undefined | null): Record<string, string> | string | undefined {
    const cookieSource = Cast(process.env.SERVER ? this.ctx.meta.ssr.context.req.headers : document);
    const cookies = cookieSource.cookie ? cookieSource.cookie.split('; ') : [];
    const l = cookies.length;
    let result: Record<string, string> | undefined = key ? undefined : {};
    let i = 0,
      parts,
      name,
      cookie;

    for (; i < l; i++) {
      parts = cookies[i].split('=');
      name = decode(parts.shift());
      cookie = parts.join('=');

      if (!key) {
        Cast(result)[name] = cookie;
      } else if (key === name) {
        result = read(cookie);
        break;
      }
    }

    return result;
  }

  setItem(key: string, value: string, opts?: CookieOptions): void {
    opts = opts || {};

    let expire, expireValue;

    if (opts.expires !== void 0) {
      // if it's a Date Object
      if (Object.prototype.toString.call(opts.expires) === '[object Date]') {
        expire = Cast<Date>(opts.expires).toUTCString();
      }
      // if it's a String (eg. "15m", "1h", "13d", "1d 15m", "31s")
      // possible units: d (days), h (hours), m (minutes), s (seconds)
      else if (typeof opts.expires === 'string') {
        expire = parseExpireString(opts.expires);
      }
      // otherwise it must be a Number (defined in days)
      else {
        expireValue = parseFloat(opts.expires.toString());
        expire = isNaN(expireValue) === false ? getString(expireValue * 864e5) : opts.expires;
      }
    }

    const keyValue = `${encode(key)}=${stringifyCookieValue(value)}`;

    const cookie = [
      keyValue,
      expire !== void 0 ? '; Expires=' + expire : '', // use expires attribute, max-age is not supported by IE
      opts.path ? '; Path=' + opts.path : '',
      opts.domain ? '; Domain=' + opts.domain : '',
      opts.sameSite ? '; SameSite=' + opts.sameSite : '',
      opts.httpOnly ? '; HttpOnly' : '',
      opts.secure ? '; Secure' : '',
      opts.other ? '; ' + opts.other : '',
    ].join('');

    if (process.env.SERVER) {
      const req = this.ctx.meta.ssr.context.req;
      const res = this.ctx.meta.ssr.context.res;
      const reqAny = Cast(req);
      const resAny = Cast(res);
      if (reqAny.qCookies) {
        reqAny.qCookies.push(cookie);
      } else {
        reqAny.qCookies = [cookie];
      }

      resAny.setHeader('Set-Cookie', reqAny.qCookies);

      // make temporary update so future get()
      // within same SSR timeframe would return the set value

      let all = reqAny.headers.cookie || '';

      if (expire !== void 0 && expireValue < 0) {
        const val = this.getItem(key);
        if (val !== undefined) {
          all = all.replace(`${key}=${val}; `, '').replace(`; ${key}=${val}`, '').replace(`${key}=${val}`, '');
        }
      } else {
        all = all ? `${keyValue}; ${all}` : cookie;
      }

      reqAny.headers.cookie = all;
    } else {
      document.cookie = cookie;
    }
  }

  removeItem(key: string, opts?: CookieOptions): void {
    this.setItem(key, '', { expires: -1, ...opts });
  }
}

function encode(string) {
  return encodeURIComponent(string);
}

function decode(string) {
  return decodeURIComponent(string);
}

function stringifyCookieValue(value) {
  return encode(value === Object(value) ? JSON.stringify(value) : '' + value);
}

function read(string) {
  if (string === '') {
    return string;
  }

  if (string.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    string = string.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  // Replace server-side written pluses with spaces.
  // If we can't decode the cookie, ignore it, it's unusable.
  // If we can't parse the cookie, ignore it, it's unusable.
  string = decode(string.replace(/\+/g, ' '));

  return string;
}

function parseExpireString(str) {
  let timestamp = 0;

  const days = str.match(/(\d+)d/);
  const hours = str.match(/(\d+)h/);
  const minutes = str.match(/(\d+)m/);
  const seconds = str.match(/(\d+)s/);

  if (days) {
    timestamp += days[1] * 864e5;
  }
  if (hours) {
    timestamp += hours[1] * 36e5;
  }
  if (minutes) {
    timestamp += minutes[1] * 6e4;
  }
  if (seconds) {
    timestamp += seconds[1] * 1000;
  }

  return timestamp === 0 ? str : getString(timestamp);
}

function getString(msOffset) {
  const time = new Date();
  time.setMilliseconds(time.getMilliseconds() + msOffset);
  return time.toUTCString();
}
