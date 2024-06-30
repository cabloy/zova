# 具名bean: 通用

除了`@Local`之外，其他装饰器函数装饰的 class 都是`具名bean`。Zova 为此类 bean 提供了命名规范，既可以避免命名冲突，也有利于跨模块使用

从本质上来说，我们只需要通过一个通用的装饰器函数`@Bean`来定义所有的`具名bean`。其他装饰器函数都是派生自`@Bean`，目的是为了提供不同的缺省参数

## @Bean

比如，要定义一个 store bean `userInfo`，可以有以下两种方式：

```typescript
@Store()
export class StoreUserInfo {}
```

```typescript
@Bean({ scene: 'store', name: 'userInfo', containerScope: 'app' })
export class StoreUserInfo {}
```

- scene
  - Optional
  - 缺省值：bean
  - Bean 的场景值，用于对 Bean 进行归类
- name
  - Optional
  - 缺省值：从 class name 自动解析
  - Bean 的名称
- containerScope
  - Optional
  - 缺省值：ctx
  - 在其他 Bean 实例中注入本 Bean 时，如果没有明确指定 containerScope，就使用这里指定的值

## Bean标识

在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk

因此，在跨模块使用`具名bean`时，我们不建议直接`基于类型`注入，而是`基于标识`注入

系统会为每一个`具名bean`自动分配一个标识，格式如下：

```bash
{moduleName}.{scene}.{name}
```

比如，前面创建的 store bean `userInfo`，对应的标识为：`a-demo.store.userInfo`，其中`a-demo`是`userInfo`所归属的模块名称

## 派生清单

为了方便使用，并且简化代码，Zova 提供了几个派生的`具名Bean`:

| 名称   | 说明                                                        | scene | default containerScope |
| ------ | ----------------------------------------------------------- | ----- | ---------------------- |
| @Bean  | 通用装饰器                                                  | bean  | ctx                    |
| @Model | [Model: 统一数据源](../../techniques/model/introduction.md) | model | ctx                    |
| @Store | [全局状态对象](./store-bean.md)                             | store | app                    |
| @Style | [全局样式](../../techniques/css-in-js/class.md)             | style | app                    |
| @Theme | [Theme](../../techniques/css-in-js/theme.md)                | theme | app                    |
| @Tool  | 工具Bean                                                    | tool  | app                    |
