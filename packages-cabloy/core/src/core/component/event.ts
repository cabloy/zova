import { composeAsync } from '@cabloy/compose';
import { BeanSimple } from '../../bean/beanSimple.js';
import {
  IEventRecord,
  IEventResultRecord,
  TypeEventContext,
  TypeEventHandlers,
  TypeEventHandlersMap,
  TypeEventNext,
} from '../../types/interface/event.js';

const __adapter = (_context, chain) => {
  const eventHandler = chain;
  return {
    receiver: undefined,
    fn: eventHandler,
  };
};

export class AppEvent extends BeanSimple {
  private eventHandlersMap = {} as TypeEventHandlersMap<keyof IEventRecord>;

  /** @internal */
  public async initialize() {}

  public getEventHandlers<K extends keyof IEventRecord>(
    eventName: K,
  ): TypeEventHandlers<IEventRecord[K], IEventResultRecord[K]> {
    let eventHandlers = this.eventHandlersMap[eventName];
    if (!eventHandlers) {
      eventHandlers = this.eventHandlersMap[eventName] = [] as any;
    }
    return eventHandlers;
  }

  async emit<K extends keyof IEventRecord>(
    eventName: K,
    data: IEventRecord[K],
    result?: IEventResultRecord[K],
    next?: TypeEventNext<IEventRecord[K], IEventResultRecord[K]>,
  ): Promise<IEventResultRecord[K]> {
    const eventHandlers = this.getEventHandlers(eventName);
    // context
    const context = {
      data,
      result,
    } as TypeEventContext<IEventRecord[K], IEventResultRecord[K]>;
    // invoke
    await composeAsync(eventHandlers, __adapter)(context, async (context, _next) => {
      if (next) {
        await next(context, _next);
      } else {
        await _next();
      }
    });
    // ok
    return context.result;
  }

  on<K extends keyof IEventRecord>(
    eventName: K,
    fn: TypeEventNext<IEventRecord[K], IEventResultRecord[K]>,
  ): () => void {
    const eventHandlers = this.getEventHandlers(eventName);
    eventHandlers.push(fn);
    return () => {
      const index = eventHandlers.findIndex(item => item === fn);
      if (index > -1) {
        eventHandlers.splice(index, 1);
      }
    };
  }
}
