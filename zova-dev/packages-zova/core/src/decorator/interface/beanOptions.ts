import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
import { ContainerScope } from '../index.js';

export type TypeDecoratorBeanOptionsSceneBase = 'local' | 'aop' | 'virtual' | 'scope' | TypeDecoratorBeanOptionsScene;
// containerScope: store(app) data(new)
export type TypeDecoratorBeanOptionsScene = 'store' | 'data' | 'style' | 'theme' | 'tool'; // | 'ui' | 'event';

export interface IDecoratorBeanOptionsBase<T = unknown> {
  /**
   * global: module.scene.name
   * others: undefined: use beanClass
   */
  beanFullName: string;
  beanUuid: string;
  module: string;
  scene?: TypeDecoratorBeanOptionsSceneBase;
  name: string;
  beanClass: Constructable<T>;
  containerScope?: ContainerScope;
  markReactive?: boolean;
  aop?: boolean;
  aopMatch?: string | RegExp | (string | RegExp)[];
  virtual?: boolean;
  moduleBelong?: string;
  options?: unknown;
  __aopChains__: MetadataKey[];
  __aopChainsKey__: Record<string, [MetadataKey, string][]>;
}

export interface IDecoratorBeanOptions {
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  containerScope?: ContainerScope;
  markReactive?: boolean;
}

export type IDecoratorVirtualOptions = IDecoratorBeanOptions;

export interface IDecoratorLocalOptions {
  containerScope?: ContainerScope;
  markReactive?: boolean;
}

export interface IDecoratorAopOptions {
  name?: string;
  match: string | RegExp | (string | RegExp)[];
}

export interface IDecoratorScopeOptions {}

export interface IDecoratorStoreOptions {
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  markReactive?: boolean;
}

export interface IDecoratorDataOptions {
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  markReactive?: boolean;
}

export interface IDecoratorStyleOptions {
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  markReactive?: boolean;
}

export interface IDecoratorThemeOptions {
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  markReactive?: boolean;
}

export interface IDecoratorToolOptions {
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  markReactive?: boolean;
}
