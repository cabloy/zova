# 简介

我们知道`IOC控制反转`是进行系统解耦行之有效的架构设计，也是应对大型业务系统开发的支撑工具。

## Bean容器

`Bean容器`是实现`IOC`的基础构件，在 Cabloy-Front 中有两类 Bean 容器:

1. app bean 容器：在系统初始化时，会自动创建唯一一个全局 Bean 容器
2. ctx bean 容器：在创建 Vue 组件实例时，系统会为每一个 Vue 组件实例创建一个 Bean 容器

## Bean分类

在 Cabloy-Front 中有两类 Bean：

1. global bean：在 app bean 容器中创建 Bean 实例，因此也是全局唯一，从而替代 pinia 的功能
2. local bean：在 ctx bean 容器中创建 Bean 实例，因此只在所属 Vue 组件实例中有效
