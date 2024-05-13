import { IBeanRecord } from '../../bean/type.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorUseOptions } from '../index.js';

export function Use(options?: IDecoratorUseOptions): PropertyDecorator;
export function Use<T extends keyof IBeanRecord>(beanFullName?: T): PropertyDecorator;
export function Use(options?: IDecoratorUseOptions | string): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    if (!options) options = {};
    if (typeof options === 'string') {
      options = { beanFullName: options } as unknown as IDecoratorUseOptions;
    }
    // beanClass
    const beanClass = appMetadata.getDesignType(target, prop) as Constructable;
    // record
    appResource.addUse(target, {
      ...options,
      prop,
      beanClass,
    });
  };
}
