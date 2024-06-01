import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { IDecoratorVirtualOptions } from '../interface/beanOptions.js';
import { Constructable } from '../type/constructable.js';

export function Virtual<T>(options?: IDecoratorVirtualOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: options.scene || 'virtual',
      name: options.name,
      containerScope: options.containerScope,
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable<T>,
      virtual: true,
    });
  };
}
