# Inject(API)

## @Use

Inject Bean instance through `@Use` decorator function

```typescript
export declare function Use(options?: IDecoratorUseOptions): PropertyDecorator;
export declare function Use<T extends keyof IBeanRecord>(beanFullName?: T): PropertyDecorator;
```

- No parameters
  - Inject through Bean Class type
- beanFullName
  - Inject through Bean identifier
- options: IDecoratorUseOptions
  - Injection parameters

```typescript
export interface IDecoratorUseOptions {
  beanFullName?: keyof IBeanRecord;
  name?: string;
  containerScope?: ContainerScope;
}
```

- beanFullName
  - Optional
  - Inject through Bean identifier
- name
  - Optional
  - Inject through variable name
- containerScope：`app/ctx/new/host/skipSelf`

  - Optional
  - Default: Use the value specified when the bean is defined

- `Special injection rule`: If no injection parameters are specified and the type of the bean class is not specified, then the `variable name` is used directly to find the existing bean instance in the bean container

## @UseScope

Inject the module's Scope object through the `@UseScope` decorator function, see: [Module Scope](../scope/introduction.md)

## @UseComposable

Inject the Vue Composables through the `@UseComposable` decorator function, see: [Composables](../../vue/composables.md)
