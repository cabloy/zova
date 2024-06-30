# 简介

我们知道`IOC控制反转`是进行系统解耦行之有效的架构设计，也是应对大型业务系统开发的支撑工具

## Bean容器

`Bean容器`是实现`IOC`的基础构件，在 Zova 中有两类 Bean 容器:

1. `app bean 容器`：在系统初始化时，会自动创建唯一一个全局 Bean 容器
2. `ctx bean 容器`：在创建 Vue 组件实例时，系统会为每一个 Vue 组件实例创建一个 Bean 容器

## Bean分类

在 Zova 中有两类 Bean：

1. `匿名bean`：使用`@Local`装饰的 class 就是`匿名bean`。此类 bean 仅在模块内部使用，不存在命名冲突的问题，定义和使用都很便捷
2. `具名bean`：除了`@Local`之外，其他装饰器函数装饰的 class 都是`具名bean`。Zova 为此类 bean 提供了命名规范，既可以避免命名冲突，也有利于跨模块使用

## 注入Scope

在 Zova 中`具名Bean`有三个注入范围：

1. `app`：在 app bean 容器中注入
2. `ctx`：在当前 Vue 组件实例所属的 ctx bean 容器中注入
3. `new`：总是创建一个新的 bean 实例
