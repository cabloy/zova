# Bean Identifier

In Zova, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building

Therefore, when using store beans cross-module, we do not recommend injecting directly based on `type`, but rather on `identifier`

The system will automatically assign an identifier to each store bean as the following format:

```bash
{moduleName}.store.{beanName}
```

For example, the previously created `userInfo` corresponds to the identifier `demo-basic.store.userInfo`, where `demo-basic` is the module name which `userInfo` belongs to
