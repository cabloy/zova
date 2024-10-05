# Introduction

We know that `IOC`(Inversion of Control) is an effective architectural design for system decoupling, and is also a supporting tool for the development of large-scale business systems

## State sharing mechanism

In actual development, the state sharing of three scenes will be encountered: `state sharing of component internal`, `state sharing between components` and `global state sharing`. In the traditional Vue3, different mechanisms are used to achieve these state sharing scenes, while only a unified IOC container mechanism is needed in Zova

| Scene                               | Traditional Vue3 | Zova |
| ----------------------------------- | ---------------- | ---- |
| state sharing of component internal | Composable       | IOC  |
| state sharing between components    | Provide/Inject   | IOC  |
| global state sharing                | Pinia            | IOC  |

## IOC Containers

There are two types of ioc containers in Zova:

1. `global ioc container`(referred to as app container): During system initialization, a unique global bean container will be automatically created. Bean instances created in this container are all singleton mode
2. `component instance ioc container`(referred to as ctx container): When creating Vue component instances, the system will create a bean container for each of them. Bean instances created in this container can share data and logic within the scope of the component instance

## Bean Class

Zova adopts a modular system, and Bean Classes are provided by different modules. When using the Bean Class inside the same module, you can directly resolve it based on `Class type`. When using cross-module, you can resolve it based on `Bean identifier` instead of `Class type/file path`, which is conducive to achieving loose coupling between modules

Therefore, Zova provides two types of Bean Classes:

1. `Anonymous bean`: The class decorated with `@Local` is an `anonymous bean`. This type of bean is only used within the module, there is no naming conflict, and it is easy to define and use

2. `Named bean`: Except for `@Local`, the classes decorated by the other decorator functions are `named beans`. Zova provides a unified naming convention for such beans, and assigns the unique `Bean identifier` to avoid naming conflicts, but also conducive to cross-module use

## Injection Scope

Zova provides the following injection scopes:

1. `app`: Inject in the app container

2. `ctx`: Inject in the ctx container

3. `new`: Always create a new bean instance

## Hierarchical injection

Injection scope also supports hierarchical injection:

1. `host`: the bean instance will be lookuped in the ioc container of the current component instance and all parent containers in turn
2. `skipSelf`: lookup the bean instance in all parent containers in turn
