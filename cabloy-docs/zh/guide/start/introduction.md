# 简介

## 什么是Cabloy-Front？

Cabloy-Front 是一款支持 IOC 容器的 Vue3 框架。不用`ref/reactive`，不用`ref.value`，不用`pinia`

## 与UI库的配合

Cabloy-Front 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用，包括：

- antdv
- element-plus
- quasar
- vuetify

## 特性

Cabloy-Front 为 Vue3 引入了以下鲜明特征：

- `不用ref/reactive`：因为在大多数场景下，不需要使用 ref 和 reactive
- `不用ref.value`：因为在 Cabloy-Front 中定义响应式变量更加直观，不再需要 ref 语义
- `不用pinia`：因为 Cabloy-Front 提供了 IOC 容器，可以更加灵活的定义和使用全局对象

## 动图演示

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## 演示：不用`ref/reactive`，不用`ref.value`

### 1. 定义响应式状态

```typescript
@Local()
export class MotherPageCounter extends BeanMotherPageBase {
  counter: number = 0;

  inrement() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
```

### 2. 使用响应式状态

```typescript
@Local()
export class RenderPageCounter extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.counter}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## 演示：依赖注入

### 1. 抽离逻辑

将`counter`逻辑抽离出来，创建一个`Counter` Bean

```typescript
@Local()
export class LocalCounter extends BeanBase {
  counter: number = 0;

  inrement() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
```

### 2. 在组件中注入并使用

```typescript
@Local()
export class MotherPageCounter extends BeanMotherPageBase {
  @Use()
  $$counter: LocalCounter;
}
```

```typescript
@Local()
export class RenderPageCounter extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.$$counter.counter}</div>
        <button onClick={() => this.$$counter.inrement()}>Inrement</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```
