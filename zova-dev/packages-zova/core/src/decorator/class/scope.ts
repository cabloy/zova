import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { Constructable, IDecoratorScopeOptions } from '../index.js';

export function Scope(options?: IDecoratorScopeOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: 'scope',
      name: 'module', // force to the same name
      containerScope: 'app',
      markReactive: false,
      beanClass: target as unknown as Constructable,
    });
  };
}
