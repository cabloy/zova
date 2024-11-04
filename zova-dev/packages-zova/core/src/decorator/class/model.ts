import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { Constructable, IDecoratorModelOptions } from '../index.js';

export function Model(options?: IDecoratorModelOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: options.scene || 'model',
      name: options.name,
      containerScope: 'ctx',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
