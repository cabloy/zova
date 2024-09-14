import { z } from 'zod';

export interface ZovaConfigRoutes {}
export interface IPagePathRecord {}
export interface IPageNameRecord {}

export type TypePageParamsQuery<Q = unknown, P = unknown> = {
  query?: Q;
  params?: P;
};

export type TypePageSchema = { params?: z.ZodTypeAny; query: z.ZodTypeAny };
export type TypePageSchemas = Record<string, TypePageSchema>;
