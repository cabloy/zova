import { composeAsync } from '@cabloy/compose';
import { BeanSimple } from '../../bean/beanSimple.js';
import {
  IEventRecord,
  IEventResultRecord,
  TypeEventContext,
  TypeEventHandler,
  TypeEventHandlers,
  TypeEventHandlersMap,
  TypeEventOff,
} from '../../types/interface/event.js';

const __adapter = (_context, chain) => {
  const eventHandlerWrapper = chain;
  if (eventHandlerWrapper.fn === null) return;
  return {
    receiver: undefined,
    fn: eventHandlerWrapper.fn,
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
    data?: IEventRecord[K],
    initialValue?: IEventResultRecord[K],
    fallback?: TypeEventHandler<IEventRecord[K], IEventResultRecord[K]>,
  ): Promise<IEventResultRecord[K]> {
    const eventHandlers = this.getEventHandlers(eventName);
    // context
    const context = {
      data,
      result: initialValue,
    } as TypeEventContext<IEventRecord[K], IEventResultRecord[K]>;
    // invoke
    await composeAsync(eventHandlers.concat(), __adapter)(context, async (context, next) => {
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
  ): TypeEventOff {
    const eventHandlers = this.getEventHandlers(eventName);
    eventHandlers.push({ fn });
    return () => {
      const index = eventHandlers.findIndex(item => item.fn === fn);
      if (index > -1) {
        eventHandlers[index].fn = null;
        eventHandlers.splice(index, 1);
      }
    };
  }

  once<K extends keyof IEventRecord>(
    eventName: K,
    fn: TypeEventHandler<IEventRecord[K], IEventResultRecord[K]>,
  ): TypeEventOff {
    const off = this.on(eventName, async (context, next) => {
      await fn(context, next);
      off();
    });
    return off;
  }
}
