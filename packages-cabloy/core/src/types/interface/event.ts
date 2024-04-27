export type TypeEventOnResult = () => void;

export type TypeEventHandlersMap<KS extends keyof IEventRecord> = {
  [K in KS]: TypeEventHandlers<IEventRecord[K], IEventResultRecord[K]>;
};

export type TypeEventHandlers<D = unknown, R = unknown> = TypeEventHandler<D, R>[];

export type TypeEventContext<D, R> = {
  data: D;
  result: R;
};

export type TypeEventHandler<D, R> = {
  (context: TypeEventContext<D, R>, next: TypeEventNext): Promise<void>;
};

export type TypeEventNext = () => Promise<void>;

export interface IEventRecord {}
export type TypeEventRecordKeys = keyof IEventRecord;

export interface IEventResultRecord {}
export type TypeEventResultRecordKeys = keyof IEventResultRecord;
