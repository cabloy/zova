# Vue子组件

在[子组件](../component/child.md)中，我们已经知道了如何在父组件中使用子组件。在 Zova 中，子组件被作为模块 Scope 的资源统一管理。因此，我们还可以通过 Scope 实例更便捷的使用子组件

## 使用子组件

在[子组件](../component/child.md)中，我们创建了一个子组件`card`，现在通过 Scope 实例直接使用子组件`card`

```typescript{5-12}
export class RenderPageComponent {
  render() {
    return (
      <div>
        <this.scope.component.card
          header="header"
          content="content"
          footer="footer"
          onReset={time => {
            console.log(time);
          }}
        ></this.scope.component.card>
      </div>
    );
  }
}
```

- 动图演示
  ![scope-component](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-component.gif)

## 跨模块使用子组件

```typescript{1,4-5,10-17}
import type { ScopeModuleADemo } from 'zova-module-a-demo';

export class RenderPageComponent {
  @UseScope('a-demo')
  scopeModuleADemo: ScopeModuleADemo;

  render() {
    return (
      <div>
        <this.scopeModuleADemo.component.card
          header="header"
          content="content"
          footer="footer"
          onReset={time => {
            console.log(time);
          }}
        ></this.scopeModuleADemo.component.card>
      </div>
    );
  }
}
```
