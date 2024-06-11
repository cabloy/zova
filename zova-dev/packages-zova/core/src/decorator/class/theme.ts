import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { Constructable, IDecoratorStyleOptions } from '../index.js';

export function Theme<T>(options?: IDecoratorStyleOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: options.scene || 'theme',
      name: options.name,
      containerScope: 'app',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
