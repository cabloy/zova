import { appResource } from '../../core/resource.js';
import { Cast } from '../../types/utils/cast.js';
import { Constructable, IDecoratorThemeHandlerOptions } from '../index.js';

export function ThemeHandler(options?: IDecoratorThemeHandlerOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      module: Cast(options).module,
      scene: options.scene || 'themeHandler',
      name: options.name,
      containerScope: 'app',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
