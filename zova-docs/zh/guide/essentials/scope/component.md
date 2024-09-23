# Vue子组件

在[子组件](../component/child.md)中，我们已经知道了如何在父组件中使用子组件。在 Zova 中，子组件被作为模块 Scope 的资源统一管理。因此，我们还可以通过 Scope 实例更便捷的使用子组件

## 使用子组件

在[子组件](../component/child.md)中，我们创建了一个子组件`card`，现在通过 Scope 实例直接使用子组件`card`

```typescript{5-12}
export class RenderComponent {
  render() {
    return (
      <div>
        <ZCard
          header="header"
          content="content"
          footer="footer"
          onReset={time => {
            console.log(time);
          }}
        ></ZCard>
      </div>
    );
  }
}
```

- 动图演示
  ![scope-component](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-component.gif)

## 跨模块使用子组件

```typescript{1,4-5,10-17}
import { ZCard } from 'zova-module-a-demo';

export class RenderComponent {
  @UseScope('a-demo')
  scopeModuleADemo: ScopeModuleADemo;

  render() {
    return (
      <div>
        <ZCard
          header="header"
          content="content"
          footer="footer"
          onReset={time => {
            console.log(time);
          }}
        ></ZCard>
      </div>
    );
  }
}
```

## $component

为了简化代码，Zova 提供了`home-component`模块，可以将常用的组件放入`home-component`模块。 然后，Zova 在 BeanBase 基类中注入了`$component`对象，从而可以在任何 bean 实例中通过`this.$component`直接访问`home-component`模块中定义的组件

```typescript
export class RenderState {
  render() {
    return (
      <ZPage>
        <div>Hello Zova</div>
      </ZPage>
    );
  }
}
```
