import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { Constructable, IDecoratorToolOptions } from '../index.js';

export function Tool(options?: IDecoratorToolOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: options.scene || 'tool',
      name: options.name,
      containerScope: 'app',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
