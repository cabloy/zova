# Why Vue3+IOC

Vue3 is already very powerful and flexible, why should IOC containers be introduced? IOC containers are inseparable from Class, so let’s start with Class

## Application scenarios of Class

When mentioning Class, everyone will definitely think that this is a code paradigm that Vue officially no longer recommends. In fact, to be more precise, Vue officially does not recommend defining Vue components based on Class. As the picture shows:

![](../../assets/img/vue-class-component-deprecated.png)

There are indeed several solutions for defining components based on Class in the community, but the actual development experience is not ideal, so they are not officially recommended by Vue. These valuable community practices have brought convenience to Vue development at different stages, and they also illustrate one truth:

::: info
Class should not be used in the `view layer`, but in the `business layer`
:::

- The following are several community Class solutions for reference:
  - [vue-class-component](https://github.com/vuejs/vue-class-component)
  - [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator)
  - [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
  - [nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator)

## Two-layer architecture design

In large-scale business development scenarios, two layers of architectural design are required:

1. `View layer`: It is recommended to use `<script setup>` for this layer of architecture, because the compiler syntactic sugar can indeed use very concise code to declare the types of props and emits
2. `Business layer`: This layer is related to business. A large number of engineering practices have proven that `OOP` is more suitable than `function` for business modeling and abstraction

Therefore, the introduction of IOC containers and Classes in Vue3 does not conflict with Vue’s official statement, but only applies `OOP` in the business layer architecture

## Two types of IOC containers

Zova provides two types of IOC containers:

### 1. Global container

This container is bound to `Vue App` to achieve the sharing of global state and logic, so it can directly replace the capabilities of `pinia`

### 2. Component instance container

This container is bound to a `Vue component instance`. The advantage of providing an instance-level container is that all Class instances in this container can share data and logic within the scope of the component instance

## vs. Mixins ​

### 1. Solve the drawbacks to mixins

Users who have used Vue2 may be familiar with `mixins`. `IOC container` can solve all the drawbacks to mixins:

1. Unclear source of properties: In IOC, Class performs its own duties, and it is easy to trace the source of `this` and locate its source
2. Namespace collisions: In IOC, Class instances have their own variable names, so there is no hidden danger of naming conflicts
3. Implicit cross-mixin communication: Through the hosting of the IOC container, Class instances can share data and logic very conveniently, and their sources can be clearly located

- See: [Vue3: vs. Mixins](https://vuejs.org/guide/reusability/composables.html#vs-mixins)

### 2. Absorb the advantages of mixins

Although `mixins` have many shortcomings, one advantage is that it is very convenient to share data and logic between multiple `mixins`. Although `Composables API` can also realize the sharing of data and logic, once the use chain level is deep, it is inconvenient to use

- We can look at a schematic diagram:

![why-ioc-composable](../../assets/img/why-ioc-composable.svg)

As shown in the figure, a Vue component uses two Composables, and then these two Composables also use two Composables respectively. Then, it is very inconvenient to share state and logic among these 6 Composables and cannot meet the needs of complex business

- Let’s look at the schematic diagram of the IOC container:

![why-ioc-class](../../assets/img/why-ioc-class.svg)

As shown in the figure, a Vue component corresponds to an IOC container, and 6 Class instances are injected into the IOC container. Since these Class instances are hosted by the IOC container, they can reference each other to facilitate sharing of state and logic

## Additional benefits

Based on Vue3's powerful and flexible reactive API, the IOC container automatically wraps a layer of reactive when creating a Class instance, so you can get the following benefits:

1. `No ref/reactive`: With the support of ioc container, defining reactive states no longer needs `ref/reactive`
2. `No ref.value`: Without `ref`, naturally there is no need to write a lot of `ref.value`

## FAQ

### Some people say that Zova has a strong flavor of Java

In fact, the coding styles of Zova and Java are significantly different, which is reflected in the following two aspects:

1. `Fewer decorator functions`: Zova adopts a strategy that combines dependency injection and dependency lookup, giving priority to dependency lookup, thus significantly reducing the use of decorator functions
2. `Fewer type annotations`: Zova gives priority to using dependency lookup to achieve a development experience of `Type programming without type`, which means that we can enjoy the many benefits of type programming without the need to annotate types, thus keeping our code concise and elegant, significantly improving development efficiency, and ensuring code quality

- For detailed solutions, see:
  - [IOC: BeanBase](../essentials/ioc/bean-base.md)
  - [Module Scope](../essentials/scope/introduction.md)

### Some people say that the technology trend of the front-end is that `composition better than inheritance`, so it is inappropriate to introduce IOC

In fact, in essence, the core architectural concept of the IOC container is composition. Through the hosting of the IOC container, these bean instances can be composited more freely and flexibly, and can share states and logic more conveniently
