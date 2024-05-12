import { z, ZodType } from 'zod';

// array/object
export function array(...args: Parameters<typeof z.array>) {
  return z.array(...args);
}
export function object(...args: Parameters<typeof z.object>) {
  return z.object(...args);
}

// coerce
export function string(...args: Parameters<typeof z.coerce.string>) {
  return z.coerce.string(...args);
}
export function number(...args: Parameters<typeof z.coerce.number>) {
  return z.coerce.number(...args);
}
export function boolean(...args: Parameters<typeof z.coerce.boolean>) {
  return z.coerce.boolean(...args);
}
export function bigint(...args: Parameters<typeof z.coerce.bigint>) {
  return z.coerce.bigint(...args);
}
export function date(...args: Parameters<typeof z.coerce.date>) {
  return z.coerce.date(...args);
}

// bool
export function bool(defaultValue?: boolean) {
  return z.preprocess(val => {
    if (val === undefined) return Boolean(defaultValue);
    if (val === 'false') return false;
    return Boolean(val);
  }, z.boolean().optional());
}

// infer
export type infer<T extends ZodType<any, any, any>> = z.infer<T>;
