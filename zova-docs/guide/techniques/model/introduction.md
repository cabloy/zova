# Introduction

Zova provides the `Model` mechanism in the MVC architecture, encapsulating unified data sources through `Model`, thereby standardizing the use of data, simplifying the code structure, and improving the maintainability of the code

The base of Zova Model is [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview). `TanStack Query` provides powerful data acquisition, caching and update capabilities. Zova encapsulates a very simple usage paradigm based on TanStack Query, which makes it very easy to get started. However, it is still recommended that you read the documentation for TanStack Query. If you have not used similar data management mechanisms, then you will definitely be impressed by the thought

## Demo online

- [Todo: CRUD](https://zova.js.org/zova-demo/#/demo/todo/todo)

## Feature: TanStack Query

The core of TanStack Query is to manage server-side data. Here are the capabilities provided by TanStack Query:

- `Auto-caching`: Fetch and cache the server data to avoid repeated requests
- `Automatic update`: Provides data stale policy and automatically updates at the right time
- `Reduce duplicate requests`: When accessing data in multiple places in the program at the same time, the server api will be called only once
- `Memory Optimization`: If the page component using data has been unmounted, the cached data will be automatically recycled after the specified time, thereby saving memory
- `Persistence`: The local cache can be persisted and can be automatically restored when the page is refreshed to avoid server calls

## Feature: Zova extension

Zova provides some extension capabilities based on TanStack Query:

1. `Support synchronized data`: Zova uses the data management mechanism of TanStack Query to realize the management of synchronized data, such as cookies and localstorage
2. `Automatic namespace isolation`: Zova manages data through Model Beans. The Bean instance itself has a unique identifier and can be used as a namespace for data to avoid data conflicts

## Create Model Bean

Model beans can be created through Cli commands. For example, create a Model Bean `todo` in the demo-basic module

```bash
$ zova :create:model todo --module=demo-basic
```

`src/bean/model.todo.ts`

```typescript
import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';

@Model()
export class ModelTodo extends BeanModelBase {}
```

- Use `@Model` decorator
- Inherited from base class `BeanModelBase`
