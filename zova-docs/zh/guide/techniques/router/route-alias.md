# 路由别名

可以为路由指定别名。比如，模块`home-index`提供了一个页面组件，其路径为`/home/index`。我们可以为`/home/index`指定别名为`/`，那么当用户访问`/`时，URL 仍然是`/`，但是会直接使用`/home/index`所指向的页面组件

## 全局Config

我们不能在模块的路由记录中指定路由别名，而是必须在全局 Config 中指定。为什么呢？

因为，Zova 采用的是模块化体系，每一个模块都是异步加载的。如果用户没有访问`/home/index`，模块`home-index`就不会加载，模块提供的路由记录也不会生效，那么当用户访问`/`时，系统也就不知道这是一个别名

下面是设置别名的范例：

`zova-dev/src/front/config/config/config.ts`

```typescript
// routes
config.routes = {
  path: {
    '/home/index': { alias: '/' },
    '/demo/todo/todo': { alias: '/todo' },
  },
  name: {
    'demo-todo:item': { alias: '/todo/:id' },
  },
};
```

| 名称        | 说明                   |
| ----------- | ---------------------- |
| routes.path | 为`路由Query`设置别名  |
| routes.name | 为`路由Params`设置别名 |
