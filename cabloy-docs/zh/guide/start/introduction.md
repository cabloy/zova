# 简介

## 视频

|                                                                                                |                                                                                                |                                                                                                              |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [![vue3+tsx+ioc新体验：组件开发][vue3+tsx+ioc-component-image]][vue3+tsx+ioc-component-url]    | [![vue3+tsx+ioc容器全新开发范式: State状态][vue3+tsx+ioc-state-image]][vue3+tsx+ioc-state-url] | [![vue3路由query如何支持类型化的object参数][vue3+tsx+ioc-query-object-image]][vue3+tsx+ioc-query-object-url] |
| [![vue3+tsx+ioc容器全新开发范式: Props属性][vue3+tsx+ioc-props-image]][vue3+tsx+ioc-props-url] | [![vue3+tsx+ioc容器全新开发范式: Emits事件][vue3+tsx+ioc-emits-image]][vue3+tsx+ioc-emits-url] | [![vue3+tsx+ioc容器全新开发范式: Slots插槽][vue3+tsx+ioc-slots-image]][vue3+tsx+ioc-slots-url]               |

[vue3+tsx+ioc-component-image]: ../../assets/cover/vue3+tsx+ioc-component.jpg
[vue3+tsx+ioc-component-url]: https://www.bilibili.com/video/BV1ky411a7A6/
[vue3+tsx+ioc-state-image]: ../../assets/cover/vue3+tsx+ioc-state.jpg
[vue3+tsx+ioc-state-url]: https://www.bilibili.com/video/BV14m411y7gx/
[vue3+tsx+ioc-query-object-image]: ../../assets/cover/vue3+tsx+ioc-query-object.jpg
[vue3+tsx+ioc-query-object-url]: https://www.bilibili.com/video/BV1bJ4m1w7Mb/
[vue3+tsx+ioc-props-image]: ../../assets/cover/vue3+tsx+ioc-props.jpg
[vue3+tsx+ioc-props-url]: https://www.bilibili.com/video/BV11z421U7MW/
[vue3+tsx+ioc-emits-image]: ../../assets/cover/vue3+tsx+ioc-emits.jpg
[vue3+tsx+ioc-emits-url]: https://www.bilibili.com/video/BV1W1421z7pu/
[vue3+tsx+ioc-slots-image]: ../../assets/cover/vue3+tsx+ioc-slots.jpg
[vue3+tsx+ioc-slots-url]: https://www.bilibili.com/video/BV1nm421u71x/

## 什么是Cabloy-Front？

Cabloy-Front 是一款支持 IOC 容器的 Vue3 框架。有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`，也不再需要`ref.value`

## 与UI库的配合

Cabloy-Front 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用，包括：

- antdv
- element-plus
- quasar
- vuetify

## 特性

Cabloy-Front 为 Vue3 引入了以下鲜明特征：

1. `不用ref/reactive`：有了 IOC 容器的加持，定义响应式状态不再需要`ref/reactive`
2. `不用ref.value`：因为不用`ref`，自然也就不用再写大量的`ref.value`
3. `模块化体系`：在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块，这就是 Cabloy-Front 采用模块化体系的缘由。因此，在 Cabloy-Front 中，实际的业务代码开发都是在模块中进行

## 动图演示

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## 演示：不用`ref/reactive`，不用`ref.value`

[![Edit zhennann/cabloy-front-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/cabloy-front-demo-codesandbox/main?embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter%2Fcontroller.ts)

### 1. 定义响应式状态

在组件中定义一个响应式变量`count`，并且添加两个方法修改变量的值

```typescript
export class ControllerPageCounter {
  count: number = 0;

  inrement() {
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
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 演示：依赖注入

[![Edit zhennann/cabloy-front-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/cabloy-front-demo-codesandbox/main?embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter2%2Fcontroller.ts)

### 1. 逻辑抽离

将`count`逻辑抽离出来，创建一个`Counter`Bean

```typescript
@Local()
export class Counter {
  count: number = 0;

  inrement() {
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
        <button onClick={() => this.$$counter.inrement()}>Inrement</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```
