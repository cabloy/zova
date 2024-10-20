# 简介

## 视频

[![vue3+tsx+ioc 新体验：响应式与 Bean 复用][vue3+tsx+ioc-reactive-reuse-image]][vue3+tsx+ioc-reactive-reuse-url]

[vue3+tsx+ioc-reactive-reuse-image]: ../../assets/cover/vue3+tsx+ioc-reactive-reuse.jpg
[vue3+tsx+ioc-reactive-reuse-url]: https://www.bilibili.com/video/BV1rw4m1S7Bq/

- [观看更多视频](../resources/videos.md)

## 什么是Zova？

Zova 是一款更直观的前端框架，汲取 Vue3、React 和 Angular 的精华，用于开发优雅、快速、可靠的系统

## 与UI库的配合

Zova 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用，包括：

- antdv
- element-plus
- quasar
- vuetify
- empty：可以在此基础上使用其他 UI 库

## 在线演示

- [vue3 + ts + tsx + tailwindcss + daisyui](https://zova.js.org/zova-demo/)

## 代码风格：Vue+React+Angular

Zova 结合`Vue/React/Angular`的优点，规避他们的缺点，让我们的开发体验更加优雅，减轻心智负担

1. `Vue`：Zova 仍然使用 Vue3 便利的响应式系统，但是定义响应式变量就像原生变量一样，不需要使用`ref/reactive`，自然也不需要`ref.value`
2. `React`：Zova 在一个`Render Class`中通过`tsx`语法来书写渲染逻辑，不仅可以与 TS 类型系统完美契合，也可以支持渲染代码的拆分，即便是面对复杂业务也可以保持代码的舒展与优雅。在 Zova 中没有类似 React 的众多 hook api，大量减轻心智负担
3. `Angular`：在实际开发当中，会遇到三个场景的状态共享：`组件内部状态共享`、`组件之间状态共享`、`全局状态共享`。在传统的 Vue3 当中，分别采用不同的机制来实现，而在 Zova 中只需要采用统一的 IOC 容器机制即可。Zova 提供的 IOC 容器，摒弃了 Angular 繁琐的设计，概念更加清晰，功能更加强大

## 特性

Zova 为 Vue3 引入了以下鲜明特征：

1. `SSR`：内置开箱即用的 SSR 解决方案，同时支持 B 端和 C 端应用
2. `响应式系统`：有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`。因为不用`ref`，自然也就不用再写大量的`ref.value`
3. `CSS-in-JS`：内置 CSS-in-JS 的能力，让样式的开发更加灵活、便捷，同时提供了开箱即用的主题切换能力
4. `统一数据源`：采用统一的 Model 机制封装统一数据源，包括 Cookie、Localstorage 和 TanStack Query 管理的服务端数据
5. `IOC容器`：Zova 提供的 IOC 容器概念更加清晰，功能更加强大，是应对大型业务系统开发的利器
6. `化类型于无形`：Zova 采用依赖注入与依赖查找相结合的策略，大量减少装饰器函数的使用。优先使用依赖查找可以达到`化类型于无形`的开发体验，也就是不需要标注类型就可以享受到类型编程的诸多好处，从而让我们的代码始终保持简洁和优雅，进而显著提升开发效率，保证代码质量
7. `模块化体系`：在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块，这就是 Zova 采用模块化体系的缘由。在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk，告别 Vite 配置的烦恼，同时可以有效避免构建产物的碎片化。特别是在大型业务系统中，这种优势尤其明显

## 动图演示

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## 演示：不用`ref/reactive`，不用`ref.value`

### 1. 定义响应式状态

在组件中定义一个响应式变量`count`，并且添加两个方法修改变量的值

```typescript
export class ControllerPageCounter {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 2. 使用响应式状态

采用 tsx 语法使用`count`

```typescript
export class RenderCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <button onClick={() => this.increment()}>Increment</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 演示：依赖注入

### 1. 逻辑抽离

将`count`逻辑抽离出来，创建一个`Counter`Bean

```typescript
@Local()
export class Counter {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 2. 在组件中注入并使用

```typescript
export class ControllerPageCounter {
  @Use()
  $$counter: Counter;
}
```

```typescript
export class RenderCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.$$counter.count}</div>
        <button onClick={() => this.$$counter.increment()}>Increment</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```
