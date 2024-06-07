# 简介

## 视频

[![vue3+tsx+ioc 新体验：响应式与 Bean 复用][vue3+tsx+ioc-reactive-reuse-image]][vue3+tsx+ioc-reactive-reuse-url]

[vue3+tsx+ioc-reactive-reuse-image]: ../../assets/cover/vue3+tsx+ioc-reactive-reuse.jpg
[vue3+tsx+ioc-reactive-reuse-url]: https://www.bilibili.com/video/BV1rw4m1S7Bq/

- [观看更多视频](../resources/videos.md)

## 什么是Zova？

Zova 是一款支持 IOC 容器的 Vue3 框架。有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`，也不再需要`ref.value`

## 与UI库的配合

Zova 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用，包括：

- antdv
- element-plus
- quasar
- vuetify

## 特性

Zova 为 Vue3 引入了以下鲜明特征：

1. `不用ref/reactive`：有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`
2. `不用ref.value`：因为不用`ref`，自然也就不用再写大量的`ref.value`
3. `模块化体系`：在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块，这就是 Zova 采用模块化体系的缘由。因此，在 Zova 中，实际的业务代码开发都是在模块中进行

## 动图演示

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## 演示：不用`ref/reactive`，不用`ref.value`

[![Edit zhennann/zova-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/zova-demo-codesandbox2/main?checkout=true&embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter%2Fcontroller.ts)

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
export class RenderPageCounter {
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

[![Edit zhennann/zova-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/zova-demo-codesandbox2/main?checkout=true&embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter2%2Fcontroller.ts)

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
export class RenderPageCounter {
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
