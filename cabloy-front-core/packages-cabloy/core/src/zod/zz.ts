import { z } from 'zod';

// coerce
export function string(...args: Parameters<typeof z.coerce.string>) {
  return z.coerce.string(...args);
}
export function number(...args: Parameters<typeof z.coerce.number>) {
  return z.coerce.number(...args);
}
export function bigint(...args: Parameters<typeof z.coerce.bigint>) {
  return z.coerce.bigint(...args);
}
export function date(...args: Parameters<typeof z.coerce.date>) {
  return z.coerce.date(...args);
}
// export function boolean(...args: Parameters<typeof z.coerce.boolean>) {
//   return z.coerce.boolean(...args);
// }

// boolean
export function boolean(...args: Parameters<typeof z.boolean>) {
  return z.preprocess(
    val => {
      if (val === undefined) return undefined;
      if (val === 'false' || val === 'undefined' || val === 'null' || val === '0') return false;
      return Boolean(val);
    },
    z.boolean(...args),
  );
}

// json
export function json<T extends z.ZodRawShape>(shape: T, params?: z.RawCreateParams) {
  return z.preprocess(
    val => {
      // also undefined even val is 'null'
      if (!val) return undefined;
      if (val === 'undefined' || val === 'null') return undefined;
      return JSON.parse(String(val));
    },
    z.object(shape, params),
  );
}

// array
export function array<T extends z.ZodTypeAny>(schema: T, params?: z.RawCreateParams) {
  return z.preprocess(
    val => {
      // also undefined even val is 'null'
      if (!val) return undefined;
      if (val === 'undefined' || val === 'null') return undefined;
      return JSON.parse(String(val));
    },
    z.array(schema, params),
  );
}

// object
export function object<T extends z.ZodRawShape>(shape: T, params?: z.RawCreateParams) {
  return z.object(shape, params);
}

// infer
export type infer<T extends z.ZodType<any, any, any>> = z.infer<T>;
export type input<T extends z.ZodType<any, any, any>> = z.input<T>;
export type output<T extends z.ZodType<any, any, any>> = z.output<T>;
