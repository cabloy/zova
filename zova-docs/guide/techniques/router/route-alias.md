# Route Alias

You can specify an `alias` for the route. For example, the module `a-home` provides a page component with a path of `/home/index`. We can specify an alias `/` for `/a/home/home`, so when the user visits `/`, the URL is still `/`, but the page component corresponding to `/a/home/home` will be used directly

## Global Config

We cannot specify the route alias in the module's route record, but must specify it in the global config. Why?

Because Zova uses a modular system, each module is loaded asynchronously. If the user does not visit `/a/home/home`, the module `a-home` will not be loaded, and the route records provided by the module will not take effect. Then when the user visits `/`, the system will not know that this is an alias

Here is an example of setting aliases:

`zova-dev/src/front/config/config/config.ts`

```typescript
// routes
config.routes = {
  path: {
    '/a/home/home': { alias: '/' },
    '/demo/todo/todo': { alias: '/todo' },
  },
  name: {
    'demo-todo:item': { alias: '/todo/:id' },
  },
};
```

| Name        | Description                  |
| ----------- | ---------------------------- |
| routes.path | Set alias for `Route Query`  |
| routes.name | Set alias for `Route Params` |
