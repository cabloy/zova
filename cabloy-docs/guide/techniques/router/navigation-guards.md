# Navigation Guards

Cabloy-Front provides a module `a-homerouter`. We can add navigation guards to this module, such as judging user authentication status, jumping on the login page, and so on

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

- For specific usage of `router`, please refer to: [Vue Router: Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
