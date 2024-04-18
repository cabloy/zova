import { MetadataKey } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { IDecoratorUseHookOptions } from '../index.js';

export function UseHook(options: IDecoratorUseHookOptions): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    // record
    appResource.addUse(target, {
      ...options,
      prop,
    });
  };
}
