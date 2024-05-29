# Refs

## Template Ref {#template-ref}

如果是 Html Element 或者常规的 Vue 组件（没有使用 ioc 容器），那么就可以使用`Template Ref`引用组件实例

### 1. Html Element

以 input element 为例：

```typescript
@Local()
export class ControllerPageComponent extends BeanControllerPageBase {
  inputRef: HTMLInputElement | null;

  protected async __init__() {
    onControllerMounted(() => {
      this.inputRef?.focus();
    });
  }
}
```

- 声明变量 inputRef
- 响应 onControllerMounted 事件，执行 focus 方法

```typescript
export class RenderPageComponent {
  render() {
    return (
      <div>
        <input
          ref={ref => {
            this.inputRef = ref as any;
          }}
        />
      </div>
    );
  }
}
```

- 通过回调函数接收 ref 参数，赋值给 inputRef

### 2. Vue 组件（没有使用 ioc 容器）

以 quasar 的 QBtn 组件为例：

```typescript
@Local()
export class ControllerPageComponent extends BeanControllerPageBase {
  btnRef: InstanceType<typeof QBtn> | null;

  protected async __init__() {
    onControllerMounted(() => {
      this.btnRef?.click();
    });
  }
}
```

- 声明变量 btnRef
- 响应 onControllerMounted 事件，执行 click 方法

```typescript
export class RenderPageComponent {
  render() {
    return (
      <div>
        <input
          ref={ref => {
            this.btnRef = ref as any;
          }}
        />
      </div>
    );
  }
}
```

- 通过回调函数接收 ref 参数，赋值给 btnRef

## Controller Ref {#controller-ref}

对于使用了 ioc 容器的 Vue 组件，不能使用`Template Ref`，而是直接引用 Vue 组件对应的`controller bean`

### 1. 声明变量

先在父组件的`controller.ts`中声明变量：

```typescript
import { ControllerCard } from '../../component/card/controller.js';

export class ControllerPageComponent {
  cardRef: ControllerCard;
}
```

### 2. onControllerRef

然后监听子组件的`onControllerRef`事件获取到`controller bean`的引用值：

```typescript
export class RenderPageComponent {
  render() {
    return (
      <div>
        <Card
          onControllerRef={ref => {
            this.cardRef = ref;
          }}
        ></Card>
      </div>
    );
  }
}
```
