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

1. `不用ref/reactive`：Class 实例默认支持响应式，所以实例中的状态不需要再通过`ref/reactive`声明响应式。此外，仍然支持`原始数据`和`部分响应式`的用法
2. `不用ref.value`：不用 ref，自然也就不用再写大量的 ref.value
3. `不用 pinia`：可以直接基于全局 IOC 容器创建全局状态对象

## 动图演示

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## 演示：不用`ref/reactive`，不用`ref.value`

### 1. 定义响应式状态

```typescript
export class MotherPageCounter {
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

### 1. 逻辑抽离

将`counter`逻辑抽离出来，创建一个`Counter` Bean

```typescript
@Local()
export class LocalCounter {
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
export class MotherPageCounter {
  @Use()
  $$counter: LocalCounter;
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
