import { composeAsync } from '@cabloy/compose';
import { BeanSimple } from '../../bean/beanSimple.js';
import { IEventRecord, IEventResultRecord, TypeEventHandlers, TypeEventNext } from '../../types/interface/event.js';

const __adapter = (_context, chain) => {
  const eventHandler = chain;
  return {
    receiver: undefined,
    fn: eventHandler,
  };
};

export class AppEvent extends BeanSimple {
  private eventHandlersMap: Record<string, TypeEventHandlers> = {};

  /** @internal */
  public async initialize() {}

  async emit<K extends keyof IEventRecord>(
    eventName: K,
    data: IEventRecord[K],
    result: IEventResultRecord[K],
    next: TypeEventNext<IEventRecord[K], IEventResultRecord[K]>,
  ): Promise<IEventResultRecord[K]> {
    const eventHandlers = this.eventHandlersMap[eventName];
    // context
    const context = {
      data,
      result,
    };
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
}
