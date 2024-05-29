import { MetadataKey } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { Functionable, IDecoratorUseComposableOptions } from '../index.js';

export function UseComposable(options: IDecoratorUseComposableOptions | Functionable): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    if (typeof options === 'function') {
      options = { beanHook: options } as IDecoratorUseComposableOptions;
    }
    // record
    appResource.addUse(target, {
      ...options,
      prop,
    });
  };
}
