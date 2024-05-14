# 导航守卫

Cabloy-Front 提供了一个模块`a-homerouter`，我们可以在这个模块中添加`导航守卫`，比如判断用户认证状态，跳转 Login 页面，等等

`src/suite/a-home/modules/a-homerouter/src/local/local.router.ts`

```typescript
@Local()
export class LocalRouter extends VirtualRouter<ScopeModule> {
  protected onRouterGuards(router: StoreRouterLike) {
    router.beforeEach(async to => {
      console.log(to);
      console.log(to.meta.requiresAuth);
    });
  }
}
```

- 关于`router`的具体用法，请参见：[Vue Router: Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
