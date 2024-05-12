import { z } from 'zod';

export interface IPagePathRecord {}
export interface IPageNameRecord {}

export type TypePageParamsQuery<P, Q> = {
  params?: P;
  query?: Q;
};

export type TypePageSchemas = Record<string, { params?: z.ZodTypeAny; query: z.ZodTypeAny }>;
