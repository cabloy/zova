export interface IRoutePathRecord {}
export interface IRouteNameRecord {}

export type TypeRoutePath<P, Q> = {
  Params: P;
  Query: Q;
};
