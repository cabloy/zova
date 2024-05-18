# 导航守卫

Cabloy-Front 提供了一个模块`a-homerouter`，我们可以在这个模块中添加`导航守卫`，比如判断用户认证状态，跳转 Login 页面，等等

## onRouterGuards

模块`a-homerouter`提供了一个`LocalRouter` bean，直接在`onRouterGuards`方法中添加自定义逻辑即可

`src/suite/a-home/modules/a-homerouter/src/local/local.router.ts`

```typescript
export class LocalRouter {
  protected onRouterGuards(router: StoreRouterLike) {
    router.beforeEach(async to => {
      console.log(to);
      console.log(to.meta.requiresAuth);
    });
  }
}
```

- 关于`router`的具体用法，请参见：[Vue Router: Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)

## $router

Cabloy-Front 在`BeanBase`基类中注入了`$router`对象，从而可以在任何 bean 实例中通过`this.$router`访问 Vue Router 对象
