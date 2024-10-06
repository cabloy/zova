# 简介

Zova 提供了 MVC 架构中的 Model 机制，通过 Model 封装统一数据源，从而规范数据使用方式，简化代码结构，提升代码的可维护性

Zova Model 的基座是[TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview)。TanStack Query 提供了强大的数据获取、缓存和更新能力。Zova 在 TanStack Query 的基础上封装出了非常简洁的使用范式，可以非常容易的上手使用。但是，仍然建议你阅读 TanStack Query 的文档。如果你没有使用过类似的数据管理机制，那么你一定会受到思想的洗礼

## 在线演示

- [Todo: CRUD](https://zova.js.org/zova-demo/#/demo/todo/todo)

## 四种全局状态数据

在实际开发当中，会遇到四种全局状态数据：`异步数据（一般来自服务端）`、`同步数据`。同步数据又分为三种：`localstorage`、`cookie`、`内存`。在传统的 Vue3 当中，分别采用不同的机制来处理这些状态数据，而在 Zova 中只需要采用统一的`Model`机制

| 状态数据     | 传统的Vue3           | Zova  |
| ------------ | -------------------- | ----- |
| 异步数据     | Pinia                | Model |
| localstorage | Pinia + Localstorage | Model |
| cookie       | Pinia + Cookie       | Model |
| 内存         | Pinia                | Model |

采用 Model 机制统一管理这些全局状态数据，就可以统一获得 TanStack Query 提供的能力，包括`内存优化`、`持久化`和`SSR支持`等等，从而规范数据使用方式，简化代码结构，提升代码的可维护性

## 特性：TanStack Query

TanStack Query 的核心是对服务端数据进行管理，这里列举 TanStack Query 提供的能力：

- `自动缓存`：对获取的服务端数据进行本地缓存，避免重复获取
- `自动更新`：提供数据过期策略，在合适的时机自动更新
- `减少重复请求`：在程序的多个地方同时访问数据，将只调用一次服务端 api
- `内存优化`：如果使用数据的页面组件已经卸载，那么在指定时间之后，缓存的数据会自动回收，从而节约内存
- `持久化`：本地缓存可以持久化，当页面刷新时可以自动恢复，避免服务端调用
- `SSR支持`：在服务端准备好的初始数据，可以同步到客户端，自动完成水合

## 特性：Zova扩展

Zova 在 TanStack Query 的基础上提供了一些扩展能力：

1. `支持同步数据`：Zova 利用 TanStack Query 的数据管理机制，实现了对同步数据的管理，如 cookie、localstorage
2. `自动命名空间隔离`：Zova 通过 Model Bean 来管理数据。而 Bean 实例本身有唯一的标识，可以作为数据的命名空间，避免数据冲突

## 创建Model Bean

::: tip
右键菜单 - [模块路径]: `Zova Create/Bean: Model`
:::

依据提示输入 model bean 的名称，比如`todo`，VSCode 插件会自动添加 model bean 的代码骨架

比如，在 demo-basic 模块中创建一个 Model Bean `todo`

`demo-basic/src/bean/model.todo.ts`

```typescript
import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';

@Model()
export class ModelTodo extends BeanModelBase {}
```

- 使用@Model 装饰器
- 继承自基类 BeanModelBase
