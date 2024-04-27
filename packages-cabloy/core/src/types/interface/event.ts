export type TypeEventHandlersMap<KS extends keyof IEventRecord> = {
  [K in KS]: TypeEventHandlers<IEventRecord[K], IEventResultRecord[K]>;
};

export type TypeEventHandlers<D = unknown, R = unknown> = TypeEventNext<D, R>[];

export type TypeEventContext<D, R> = {
  data: D;
  result: R;
};

export type TypeEventNext<D, R> = {
  (context: TypeEventContext<D, R>, next: TypeEventNext<D, R>): Promise<void>;
};

export interface IEventRecord {}
export type TypeEventRecordKeys = keyof IEventRecord;

export interface IEventResultRecord {}
export type TypeEventResultRecordKeys = keyof IEventResultRecord;
