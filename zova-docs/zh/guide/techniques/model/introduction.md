# 简介

Zova 提供了 MVC 架构中的 Model 机制，通过 Model 封装统一数据源，从而规范数据使用方式，简化代码结构，提升代码的可维护性

Zova Model 的基座是[TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview)。TanStack Query 提供了强大的数据获取、缓存和更新能力。Zova 在 TanStack Query 的基础上封装出了非常简洁的使用范式，可以非常容易的上手使用。但是，仍然建议你阅读 TanStack Query 的文档。如果你没有使用过类似的数据管理机制，那么你一定会受到思想的洗礼

## 特性：TanStack Query

TanStack Query 的核心是对服务端数据进行管理，这里列举 TanStack Query 提供的能力：

- `自动缓存`：对获取的服务端数据进行本地缓存，避免重复获取
- `自动更新`：提供数据过期策略，在合适的时机自动更新
- `减少重复请求`：在程序的多个地方同时访问数据，将只调用一次服务端 api
- `内存优化`：如果使用数据的页面组件已经卸载，那么在指定时间之后，缓存的数据会自动回收，从而节约内存
- `持久化`：本地缓存可以持久化，当页面刷新时可以自动恢复，避免服务端调用

## 特性：Zova扩展

Zova 在 TanStack Query 的基础上提供了一些扩展能力：

1. `支持同步数据`：Zova 借用 TanStack Query 的数据管理机制，实现了对同步数据的管理，如 cookie、localstorage
2. `自动命名空间隔离`：Zova 通过 Model Bean 来管理数据。而 Bean 实例本身有唯一的标识，可以作为数据的命名空间，避免数据冲突

## 创建Model Bean

可以通过 Cli 命令创建 Model Bean。比如，在 a-demo 模块中创建一个 Model Bean `todo`

```bash
$ zova :create:model todo --module=a-demo
```

`src/bean/model.todo.ts`

```typescript
import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

@Model()
export class ModelTodo extends BeanModelBase<ScopeModule> {}
```

- 使用@Model 装饰器
- 继承自基类 BeanModelBase
