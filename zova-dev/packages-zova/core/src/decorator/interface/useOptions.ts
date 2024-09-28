import { IBeanRecord, IBeanScopeRecord } from '../../bean/type.js';
import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../type/constructable.js';
import { InjectionScope } from '../type/injectionScope.js';
import { Functionable } from '../type/functionable.js';

export interface IDecoratorUseOptionsBase<T = unknown> {
  prop: MetadataKey;
  beanFullName?: string;
  name?: string;
  beanClass?: Constructable<T>;
  beanComposable?: Functionable;
  /** such as: moduleScope */
  selector?: string;
  injectionScope?: InjectionScope;
  markReactive?: boolean;
}

export interface IDecoratorUseOptions {
  beanFullName?: keyof IBeanRecord;
  name?: string;
  selector?: string;
  injectionScope?: InjectionScope;
  markReactive?: boolean;
}

export interface IDecoratorUseComposableOptions {
  beanComposable?: Functionable;
  name?: string;
  selector?: string;
  injectionScope?: InjectionScope;
  markReactive?: boolean;
}

export interface IDecoratorUseScopeOptions {
  module?: keyof IBeanScopeRecord;
}
