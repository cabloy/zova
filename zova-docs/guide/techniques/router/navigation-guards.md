# Navigation Guards

Cabloy-Front provides a module `home-router`. We can add navigation guards to this module, such as judging user authentication status, jumping on the login page, and so on

## onRouterGuards

The module `home-router` provides a `Router` bean, just add custom logic directly in the `onRouterGuards` method as well

`src/suite/a-home/modules/home-router/src/local/router.ts`

```typescript
export class Router {
  protected onRouterGuards(router: StoreRouterLike) {
    router.beforeEach(async to => {
      console.log(to);
      console.log(to.meta.requiresAuth);
    });
  }
}
```

- For specific usage of `router`, see: [Vue Router: Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)

## $router

Cabloy-Front injects the `$router` object into the `BeanBase` base class, so that the Vue router object can be obtained through `this.$router` in any bean instance
