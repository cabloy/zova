import { composeAsync } from '@cabloy/compose';
import { BeanSimple } from '../../bean/beanSimple.js';
import {
  IEventRecord,
  IEventResultRecord,
  TypeEventContext,
  TypeEventHandler,
  TypeEventHandlers,
  TypeEventHandlersMap,
  TypeEventOnResult,
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
    fallback?: TypeEventHandler<IEventRecord[K], IEventResultRecord[K]>,
  ): Promise<IEventResultRecord[K]> {
    const eventHandlers = this.getEventHandlers(eventName);
    // context
    const context = {
      data,
      result,
    } as TypeEventContext<IEventRecord[K], IEventResultRecord[K]>;
    // invoke
    await composeAsync(eventHandlers, __adapter)(context, async (context, next) => {
      if (fallback) {
        await fallback(context, next);
      } else {
        await next();
      }
    });
    // ok
    return context.result;
  }

  on<K extends keyof IEventRecord>(
    eventName: K,
    fn: TypeEventHandler<IEventRecord[K], IEventResultRecord[K]>,
  ): TypeEventOnResult {
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
