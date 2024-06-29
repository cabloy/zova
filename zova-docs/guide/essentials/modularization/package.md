# package.json

You can set some meta configuration in the module's `package.json`

## zovaModule.bundle

If the module depends on some third-party modules, you can specify the bundle strategy at build time. For example, the bundle configuration of module `a-model` is as follows:

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

- match: Determine whether the file path matches
- output: Specify the bundle name for the matching files

## zovaModule.capabilities

In Zova, a module is a natural bundle boundary, and automatically bundled into an independent chunk when building. Then, it is also loaded asynchronously at runtime

If you need to provide some hook functions in the module to initialize resources when the system starts, or inject some capabilities into the system, you need to configure `zovaModule.capabilities`

Many core modules provided by Zova are implemented using this mechanism. For example, the configuration of module `a-model`:

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

- monkey: If set to `true`, it means that the module provides hook capabilities, then the system will preload the module
