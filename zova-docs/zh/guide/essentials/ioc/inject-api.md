# 注入

## @Use

通过`@Use`装饰器函数注入 Bean 实例

```typescript
export declare function Use(options?: IDecoratorUseOptions): PropertyDecorator;
export declare function Use<T extends keyof IBeanRecord>(beanFullName?: T): PropertyDecorator;
```

- 没有参数
  - 通过 Bean Class 的类型注入
- beanFullName
  - 通过 Bean 标识注入
- options: IDecoratorUseOptions
  - 注入参数

```typescript
export interface IDecoratorUseOptions {
  beanFullName?: keyof IBeanRecord;
  name?: string;
  containerScope?: ContainerScope;
}
```

- beanFullName
  - Optional
  - 通过 Bean 标识注入
- name
  - Optional
  - 通过变量名注入
- containerScope：`app/ctx/new/host/skipSelf`

  - Optional
  - 缺省值：使用 Bean 在定义时指定的值

- `特殊注入规则`：如果没有指定任何注入参数，而且也没有指定 Bean Class 的类型，那么就直接使用`变量名`在 bean 容器中查找已存在的 bean 实例

## @UseScope

通过`@UseScope`装饰器函数注入模块的 Scope 对象，参见：[模块Scope](../scope/introduction.md)

## @UseComposable

通过`@UseComposable`装饰器函数注入 Vue Composables，参见：[Composables](../../vue/composables.md)
