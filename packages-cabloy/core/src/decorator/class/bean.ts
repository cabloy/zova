import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { IDecoratorBeanOptions } from '../interface/beanOptions.js';
import { Constructable } from '../type/constructable.js';

export function Bean<T>(options?: IDecoratorBeanOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: options.scene,
      name: options.name,
      containerScope: options.containerScope,
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
