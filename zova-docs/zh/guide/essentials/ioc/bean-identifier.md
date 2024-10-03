# Bean标识

在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk

因此，在跨模块使用 store bean 时，我们不建议直接`基于类型`注入，而是`基于标识`注入

系统会为每一个 store bean 自动分配一个标识，格式如下：

```bash
{moduleName}.store.{beanName}
```

比如，前面创建的 `userInfo`，对应的标识为：`demo-basic.store.userInfo`，其中`demo-basic`是`userInfo`所归属的模块名称
