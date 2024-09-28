import { IBeanScopeRecord } from '../../bean/type.js';
import { MetadataKey } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { IDecoratorUseScopeOptions } from '../index.js';

export function UseScope(options: IDecoratorUseScopeOptions): PropertyDecorator;
export function UseScope<T extends keyof IBeanScopeRecord>(module?: T): PropertyDecorator;
export function UseScope(options: IDecoratorUseScopeOptions | string): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    if (typeof options === 'string') {
      options = { module: options } as IDecoratorUseScopeOptions;
    }
    const beanFullName = `${options.module}.scope.module`;
    // record
    appResource.addUse(target, {
      ...options,
      prop,
      beanFullName,
    });
  };
}
