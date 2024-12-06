import { isClass } from '../utils/isClass.js';
import {
  Constructable,
  Functionable,
  IDecoratorBeanOptionsBase,
  IDecoratorUseOptionsBase,
} from '../decorator/index.js';
import { MetadataKey, appMetadata } from './metadata.js';
import { IBeanRecord } from '../bean/type.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { parseLastWord, skipLastWord, skipPrefix, splitWords, toLowerCaseFirstChar } from '@cabloy/word-utils';
import { uuid } from '../utils/uuid.js';

export const DecoratorBeanFullName = Symbol.for('Decorator#BeanFullName');
export const DecoratorUse = Symbol.for('Decorator#Use');
export const DecoratorBeanFullNameOfComposable = Symbol.for('Decorator#BeanFullNameOfComposable');

export class AppResource extends BeanSimple {
  beans: Record<string, IDecoratorBeanOptionsBase> = {};
  aops: Record<string, IDecoratorBeanOptionsBase> = {};

  addUse(target: object, options: IDecoratorUseOptionsBase) {
    const uses = appMetadata.getOwnMetadataMap(DecoratorUse, target);
    uses[options.prop] = options;
    if (process.env.NODE_ENV === 'development') {
      if (typeof options.prop === 'string' && !options.prop.startsWith('$$')) {
        console.error(`inject prop name should start with $$: ${options.prop}`);
      }
    }
  }

  getUses(target: object): Record<MetadataKey, IDecoratorUseOptionsBase> | undefined {
    return appMetadata.getMetadata(DecoratorUse, target);
  }

  addAop<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    // bean
    const beanOptions = this.addBean(options);
    // aop
    this.aops[beanOptions.beanFullName] = beanOptions;
    // ok
    return beanOptions;
  }

  addBean<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    const { module, beanClass, virtual } = options;
    // name
    const { scene, name } = this._parseSceneAndBeanName(beanClass!, options.scene, options.name);
    // uuid
    const beanUuid = uuid();
    // beanFullName
    let beanFullName;
    if (['local'].includes(scene)) {
      beanFullName = beanUuid;
    } else {
      beanFullName = `${module}.${scene}.${name}`;
    }
    // moduleBelong
    const moduleBelong = this._parseModuleBelong(module, beanClass, virtual);
    // options
    const beanOptions = {
      ...options,
      scene,
      name,
      beanUuid,
      beanFullName,
      moduleBelong,
    } as IDecoratorBeanOptionsBase<T>;
    beanOptions.__aopChains__ = null!;
    beanOptions.__aopChainsKey__ = {};
    // record
    this.beans[beanOptions.beanFullName] = beanOptions;
    // set metadata
    appMetadata.defineMetadata(DecoratorBeanFullName, beanOptions.beanFullName, beanOptions.beanClass);
    // ok
    return beanOptions;
  }

  getBeanFullName<T>(A: Constructable<T>): string | undefined {
    return appMetadata.getOwnMetadata(DecoratorBeanFullName, A);
  }

  getBeanFullNameOfComposable(beanComposable: Functionable | undefined): string | undefined {
    if (!beanComposable) return;
    if (!beanComposable[DecoratorBeanFullNameOfComposable]) {
      beanComposable[DecoratorBeanFullNameOfComposable] = `useComposable.${uuid()}`;
    }
    return beanComposable[DecoratorBeanFullNameOfComposable];
  }

  getBean<T>(A: Constructable<T>): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<K extends keyof IBeanRecord>(beanFullName: K): IDecoratorBeanOptionsBase<IBeanRecord[K]> | undefined;
  getBean<T>(beanFullName: string): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<T>(beanFullName: Constructable<T> | string): IDecoratorBeanOptionsBase<T> | undefined {
    let fullName: string | undefined;
    if (typeof beanFullName === 'function' && isClass(beanFullName)) {
      fullName = appMetadata.getOwnMetadata(DecoratorBeanFullName, beanFullName);
    } else {
      fullName = beanFullName as string;
    }
    if (!fullName) return null!;
    return this.beans[fullName] as IDecoratorBeanOptionsBase<T>;
  }

  _fixClassName(className: string) {
    const ch = className.charAt(className.length - 1);
    if (ch >= '0' && ch <= '9') return className.substring(0, className.length - 1);
    return className;
  }

  _parseSceneAndBeanName<T>(
    beanClass: Constructable<T>,
    scene?: string,
    name?: string,
  ): { scene: string; name: string } {
    if (scene && name) {
      return { scene, name };
    }
    // bean class name
    let beanClassName = this._fixClassName(beanClass.name);
    // skip prefix: Bean
    if (toLowerCaseFirstChar(beanClassName).startsWith('bean')) {
      beanClassName = beanClassName.substring('bean'.length);
    } else {
      beanClassName = beanClassName;
    }
    // name
    if (!name) {
      if (scene) {
        name = skipPrefix(beanClassName, scene, true)!;
      } else {
        name = parseLastWord(beanClassName, true)!;
      }
    }
    // scene
    if (!scene) {
      scene = skipLastWord(beanClassName, name, true)!;
      scene = splitWords(scene, true, '.')!;
    }
    // ok
    return { scene, name };
  }

  _parseModuleBelong(module, beanClass, virtual) {
    // not set when virtual
    if (virtual) return;
    // check parent
    let moduleBelong;
    let parent = Object.getPrototypeOf(beanClass);
    while (parent) {
      const beanOptions = this.getBean(parent);
      if (beanOptions && beanOptions.moduleBelong) {
        moduleBelong = beanOptions.moduleBelong;
        break;
      }
      parent = Object.getPrototypeOf(parent);
    }
    // set to current when parent not set
    if (!moduleBelong) {
      moduleBelong = module;
    }
    return moduleBelong;
  }

  _getModuleBelong<T>(A: Constructable<T>): string | undefined;
  _getModuleBelong<K extends keyof IBeanRecord>(beanFullName: K): string | undefined;
  _getModuleBelong(beanFullName: string): string | undefined;
  _getModuleBelong<T>(beanFullName: Constructable<T> | string): string | undefined {
    const beanOptions = this.getBean(beanFullName as any);
    return beanOptions?.moduleBelong;
  }

  _getModuleName<T>(A: Constructable<T>): string | undefined;
  _getModuleName<K extends keyof IBeanRecord>(beanFullName: K): string | undefined;
  _getModuleName(beanFullName: string): string | undefined;
  _getModuleName<T>(beanFullName: Constructable<T> | string): string | undefined {
    const beanOptions = this.getBean(beanFullName as any);
    return beanOptions?.module;
  }

  findAopsMatched(_beanFullName: string): any[] {
    return [];
  }
}

export const appResource = new AppResource();
