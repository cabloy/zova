import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { Constructable, IDecoratorStoreOptions } from '../index.js';

export function Store<T>(options?: IDecoratorStoreOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: options.scene || 'store',
      name: options.name,
      containerScope: 'app',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
