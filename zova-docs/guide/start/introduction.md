# Introduction

## What is Zova?

Zova is a vue3 framework with ioc container, empowers developers to build fast, reliable applications

## With UI libraries

Zova can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box, including:

- antdv
- element-plus
- quasar
- vuetify
- empty： Other UI libraries can be used based on this empty template

## Demo online

- [vue3 + ts + tsx + tailwindcss + daisyui](https://zova.js.org/zova-demo/)

## Coding style: Vue+React+Angular

Zova combines the advantages of `Vue/React/Angular` and avoid their shortcomings to make our development experience more elegant and reduce the mental burden

1. `Vue`: Zova still uses Vue3's convenient responsive api system, but defining responsive variables is just like defining native variables, without the need to use `ref/reactive`, and naturally without `ref.value`
2. `React`: Zova uses the `tsx` syntax to write rendering logic in a `Render Class`, which not only perfectly matches the TS type system, but also supports the splitting of rendering code, and can keep the code clean and elegant even in the face of complex business. In Zova, there are no many hook apis like React, which greatly reduces the mental burden
3. `Angular`: In actual development, there are three scenarios of state sharing: `state sharing of component internal`, `state sharing between components` and `global state sharing`. In the traditional Vue3, different mechanisms are used to achieve these state sharing scenes, while only a unified IOC container mechanism is needed in Zova. The IOC container provided by Zova abandons the cumbersome design of Angular, with clearer concepts and more powerful functions

## Features

Zova has introduced the following distinct features for Vue3:

1. `SSR`: Built-in out-of-the-box SSR solution, supporting both front-end applications and admin management systems
2. `Reactivity`: With the support of ioc container, defining reactive states no longer needs `ref/reactive`. Without `ref`, naturally there is no need to write a lot of `ref.value`
3. `CSS-in-JS`: Built-in CSS-in-JS capability making style development more flexible and convenient, while providing out-of-the-box theme switching capabilities
4. `Unified Data Source`: Encapsulating unified data sources through model mechanism, including Cookie, Localstorage and server-side data managed by TanStack Query
5. `IOC Container`: The IOC container provided by Zova has a clearer concept and more powerful functions, which is a powerful tool for the development of large-scale business systems
6. `Type programming without type`: Zova adopts a strategy that combines dependency injection and dependency lookup, significantly reducing the use of decorator functions. Prioritizing the use of dependency lookup can achieve a development experience of `Type programming without type`, which means that we can enjoy the many benefits of type programming without the need to annotate types, thus keeping our code concise and elegant, significantly improving development efficiency, and ensuring code quality
7. `Modularization`: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Zova introduces modularization. In Zova, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building, bidding farewell to the hassle of Vite configuration and effectively avoiding the fragmentation of bundles. Especially in large business systems, this advantage is particularly evident

## Gif demonstration

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## Demonstration: no `ref/reactive`, no `ref.value`

### 1. Define reactive state

Define a reactive variable `count` in the component and add two methods to modify its value

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

### 2. Use reactive state

Use `count` in render class

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

## Demonstration: dependency injection

### 1. Logic Reuse

Create a `Counter` Bean to implement the logic of `count`

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

### 2. Inject and use in a component

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
