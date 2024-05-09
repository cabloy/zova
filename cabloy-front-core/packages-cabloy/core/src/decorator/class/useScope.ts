import { MetadataKey } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { IDecoratorUseScopeOptions } from '../index.js';

export function UseScope(options: IDecoratorUseScopeOptions): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const beanFullName = `${options.module}.scope.module`;
    // record
    appResource.addUse(target, {
      ...options,
      prop,
      beanFullName,
    });
  };
}
