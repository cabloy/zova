# 为什么需要Vue3+IOC

## 前言

Vue3 已经非常强大和灵活了，为什么还要引入 IOC 容器呢？

对于大型项目，经常会遇到一个业务组件包括大量状态和逻辑，而且这些状态和逻辑可能会相互引用。
如果放在一个 sfc 文件中显得冗长，不好维护。
在 vue2 中可以拆分为多个 mixins，但是 mixins 没有类型，所以有许多缺点。
在 vue3 中可以拆分为多个 composables，但是在多个 composables 之间共享状态和逻辑不太方便。
在这种场景下，采用 IOC 容器就是更好的选择。

IOC 容器犹如一把钥匙，为我们打开了业务工程化的大门，允许我们探索更多工程化方面的设计和能力

## Class的应用场景

IOC 容器离不开 Class，那么我们就从 Class 谈起。一提起 Class，大家一定会想到这是 Vue 官方不再推荐的代码范式。其实，更确切的说，Vue 官方是不推荐基于 Class 来定义 Vue 组件。如图所示：

![](../../../assets/img/vue-class-component-deprecated.png)

社区确实有几款`基于Class定义组件`的方案，但实际应用效果不理想，所以不被 Vue 官方推荐。这些有价值的社区实践在不同阶段给 Vue 开发带来了便利，同时也恰恰说明一个道理：

::: info
Class 不应该用在`视图层`，而是要用到`业务层`
:::

- 以下是几款社区 Class 方案，供参考：
  - [vue-class-component](https://github.com/vuejs/vue-class-component)
  - [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator)
  - [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
  - [nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator)

## 两层架构设计

在面向大型的业务开发场景中，需要两个层面的架构设计：

1. `视图层`：这一层架构推荐使用`<script setup>`，因为通过编译器语法糖确实可以使用非常简明的代码来声明 props 和 emits 的类型
2. `业务层`：这一层与业务相关。大量的工程实践证明，对于业务的建模和抽象，`OOP`比`函数式`更适合

因此，在 Vue3 中引入 IOC 容器和 Class，与 Vue 官方的说法并不相悖，只是在业务层架构中应用`OOP`

## 两类IOC容器

Zova 提供了分层的 IOC 容器，具体而言，提供了两类 IOC 容器：

### 1. 全局容器

该容器与`Vue App`绑定，从而实现全局状态和逻辑的共享，因此可以直接代替`pinia`的能力

### 2. 组件实例容器

该容器与`Vue组件实例`绑定。提供组件实例级别容器的好处就是，在这个容器中的所有 Class 实例都可以在组件实例范围之内共享数据和逻辑

## 和 Mixins 的对比

下面是基于 IOC 容器的源码案例，可以与 Mixins 做对照分析：

- [布局组件](https://github.com/cabloy/zova/tree/main/zova-dev/src/suite/a-home/modules/home-layout/src/component/layoutDefault)

### 1. 解决mixins的短板

使用过 Vue2 的用户可能对`mixins`比较熟悉。`IOC容器`可以解决 mixins 的所有短板：

1. 不清晰的数据来源：在 IOC 中 Class 各司其职，可以很方便的对`this`溯源，定位其出处
2. 命名空间冲突：在 IOC 中 Class 实例都有自己的变量名，自然没有命名冲突的隐患
3. 隐式的跨 mixin 交流：通过 IOC 容器的托管，Class 实例可以非常方便的共享数据和逻辑，而且可以清晰定位其来源

- 参见：[Vue3: 和 Mixin 的对比](https://cn.vuejs.org/guide/reusability/composables.html#vs-mixins)

### 2. 吸收mixins的长处

`mixins`虽然有许多短板，但是有一个长处，就是多个`mixins`之间共享数据和逻辑非常方便。`组合式API`虽然也能实现数据和逻辑的共享，但是一旦调用链层级深了，使用起来就不太方便

- 我们可以看一张示意图：

![why-ioc-composable](../../../assets/img/why-ioc-composable.svg)

如图所示，一个 Vue 组件使用了两个 Composables，然后这两个 Composables 又分别使用了两个 Composables。那么，如果要在这 6 个 Composables 中共享状态和逻辑是非常不方便的，无法满足复杂业务的需求

- 我们再来看 IOC 容器的示意图：

![why-ioc-class](../../../assets/img/why-ioc-class.svg)

如图所示，一个 Vue 组件对应一个 IOC 容器，在 IOC 容器中注入了 6 个 Class 实例。这些 Class 实例由于都被 IOC 容器托管，所以可以相互引用，从而方便共享状态和逻辑

## 额外好处

基于 Vue3 强大而且灵活的响应式系统，IOC 容器在创建 Class 实例时自动包裹一层 reactive，那么就可以收到如下好处：

1. `不用ref/reactive`：有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`
2. `不用ref.value`：因为不用`ref`，自然也就不用再写大量的`ref.value`

## 概念辨析

### 有人说Zova中Java的味道很浓

其实，Zova 与 Java 的代码风格有显著的不同，体现在以下两个方面：

1. `更少的装饰器函数`：Zova 采用依赖注入与依赖查找相结合的策略，优先使用依赖查找，从而大量减少装饰器函数的使用
2. `更少的类型标注`：Zova 优先使用依赖查找可以达到`化类型于无形`的开发体验，也就是不需要标注类型就可以享受到类型编程的诸多好处，从而让我们的代码始终保持简洁和优雅，进而显著提升开发效率，保证代码质量

- 详细方案，参见：
  - [IOC控制反转: BeanBase](../essentials/ioc/bean-base.md)
  - [模块Scope](../essentials/scope/introduction.md)

### 有人说前端的技术趋势是组合优于继承，所以引入IOC是不合时宜的

其实，从本质上来看，IOC 容器的核心架构理念就是组合。通过 IOC 容器的托管，这些 Bean 实例可以更加自由灵活的组合，可以更加便利的共享状态和逻辑

## 社区文章

以下文章来自社区，观点可能有所偏颇，但对于理解不同框架的设计风格有许多助益：

- [React 十年——过去、现在和未来](https://zhuanlan.zhihu.com/p/675465137)

  > 摘录：事实上，如果在类组件上实现一个支持外部数据响应性和生命周期合并的简易依赖注入（只需要瞬态作用域），我们就可以拥有不逊于 Hooks 的复用能力。同时，一旦我们不小心额外加了几行代码，实现了单例作用域，那就顺便实现了状态管理功能，一脚把 Redux 踹进垃圾桶。是的，事情本就是这么简单。
