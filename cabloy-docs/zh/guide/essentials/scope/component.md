# Vue子组件

在[子组件](../component/child.md)中，我们已经知道了如何在父组件中使用子组件。在 Cabloy-Front 中，子组件被作为模块 Scope 的资源统一管理。因此，我们还可以通过 Scope 实例更便捷的使用子组件

## 使用子组件

在[子组件](../component/child.md)中，我们创建了一个子组件`card`，现在通过 Scope 实例直接使用子组件`card`

```typescript{6-13}
@Local()
export class RenderPageComponent extends BeanRenderBase<ScopeModule> {
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

## 跨模块使用子组件

```typescript{1,5-6,11-18}
import type { ScopeModuleTestDemo } from 'cabloy-module-front-test-demo';

@Local()
export class RenderPageComponent extends BeanRenderBase<ScopeModule> {
  @UseScope('test-demo')
  scopeModuleTestDemo: ScopeModuleTestDemo;

  render() {
    return (
      <div>
        <this.scopeModuleTestDemo.component.card
          header="header"
          content="content"
          footer="footer"
          onReset={time => {
            console.log(time);
          }}
        ></this.scopeModuleTestDemo.component.card>
      </div>
    );
  }
}
```
