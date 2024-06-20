import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { Constructable, IDecoratorDataOptions } from '../index.js';

export function Data<T>(options?: IDecoratorDataOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: options.scene || 'data',
      name: options.name,
      containerScope: 'ctx',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
