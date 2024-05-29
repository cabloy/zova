import { MetadataKey } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { Functionable, IDecoratorUseHookOptions } from '../index.js';

export function UseHook(options: IDecoratorUseHookOptions | Functionable): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    if (typeof options === 'function') {
      options = { beanHook: options } as IDecoratorUseHookOptions;
    }
    // record
    appResource.addUse(target, {
      ...options,
      prop,
    });
  };
}
