# Vue Child Component

In [Child Component](../component/child.md), we already know how to use child components in parent components. In Cabloy-Front, child components are managed uniformly as resources of the module `Scope`. Therefore, we can also use child components more conveniently through `Scope` instance

## Use Child Component

In [Child Component](../component/child.md), we created a child component `card`, and now use the child component `card` directly through the `Scope` instance

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

- Gif Demonstration
  ![scope-component](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-component.gif)

## Use Child Component cross-module

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
