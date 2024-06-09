# Vue Child Component

In [Child Component](../component/child.md), we already know how to use child components in parent components. In Zova, child components are managed uniformly as resources of the module `Scope`. Therefore, we can also use child components more conveniently through `Scope` instance

## Use Child Component

In [Child Component](../component/child.md), we created a child component `card`, and now use the child component `card` directly through the `Scope` instance

```typescript{5-12}
export class RenderComponent {
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

```typescript{1,4-5,10-17}
import type { ScopeModuleADemo } from 'zova-module-a-demo';

export class RenderComponent {
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
