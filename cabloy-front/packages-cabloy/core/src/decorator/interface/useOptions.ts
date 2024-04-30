import { IBeanRecord } from '../../bean/type.js';
import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../type/constructable.js';
import { ContainerScope } from '../type/containerScope.js';
import { Functionable } from '../type/functionable.js';

export interface IDecoratorUseOptionsBase<T = unknown> {
  prop: MetadataKey;
  beanFullName?: string;
  name?: string;
  beanClass?: Constructable<T>;
  beanHook?: Functionable;
  /** such as: moduleScope */
  selector?: string;
  containerScope?: ContainerScope;
  markReactive?: boolean;
}

export interface IDecoratorUseOptions {
  beanFullName?: keyof IBeanRecord;
  name?: string;
  selector?: string;
  containerScope?: ContainerScope;
  markReactive?: boolean;
}

export interface IDecoratorUseHookOptions {
  beanHook?: Functionable;
  name?: string;
  selector?: string;
  containerScope?: ContainerScope;
  markReactive?: boolean;
}
