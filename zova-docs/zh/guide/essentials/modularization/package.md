# package.json

可以在模块的`package.json`中设置一些元配置

## zovaModule.bundle

如果模块依赖了某些第三方模块，可以指定在构建时的分包策略。比如，模块 a-model 的分包配置如下：

```typescript
{
  "name": "zova-module-a-model",
  "zovaModule": {
    "bundle": {
      "vendors": [
        {
          "match": [
            "@tanstack"
          ],
          "output": "tanstack"
        },
        {
          "match": [
            "js-cookie"
          ],
          "output": "js-cookie"
        },
        {
          "match": [
            "localforage"
          ],
          "output": "localforage"
        }
      ]
    }
  },
}
```

- match: 判断文件路径是否匹配
- output: 为匹配文件指定分包的名称

## zovaModule.capabilities

在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的 Chunk。那么，在运行时也是异步加载的

如果需要在模块中提供一些钩子功能，从而在系统启动时初始化资源，或者向系统注入一些能力，那么就需要配置`zovaModule.capabilities`

Zova 提供的许多核心模块都是采用这种机制实现的。比如，模块 a-model 的配置：

```typescript
{
  "name": "zova-module-a-model",
  "zovaModule": {
    "capabilities": {
      "monkey": true
    },
  },
}
```

- monkey: 设为 true，就说明该模块提供了钩子能力，那么系统就会预先加载该模块
