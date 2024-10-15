# Module

In Zova, `Modules` consolidate pages, components, configurations, languages ​​and other resources into cohesive blocks of functionality, each focused on a feature area, application business domain, workflow, or common collection of utilities

## Why need Modularization?

May you agree with such an architectural concept: if you want to avoid `shit mountains`, then put `shit` into boxes.

In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Zova introduces modularization.

## Benefits of Modularization

### For Business

1. **Business decoupling**: clear code structure and fully decoupled business logic
2. **Business logic reuse**: Taking modules as development units, it is convenient to deposit technical assets and reuse them in different systems
3. **Team development**: the business system is divided into modules, which is conducive to the decomposition and allocation of development tasks

### For Code

4. **Namespace isolation**: the namespace isolation mechanism of the module helps to reduce the mental burden during development. When we name variables for resources such as component, config and so on in the module, we don’t have to worry that this name will conflict with other modules, which can also make variable naming more concise and natural
5. **Building chunks more easier**: In Zova, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building, bidding farewell to the hassle of Vite configuration and effectively avoiding the fragmentation of bundles. Especially in large business systems, this advantage is particularly evident

## Naming Convention

To achieve namespace isolation, Zova introduces the following naming convention for modules:

```bash
FullName: zova-module-{providerId}-{moduleName}
ShortName: {providerId}-{moduleName}
```

- You can use a function or feature as a `providerid`, such as: test, demo, blog, dashboard, flow, etc.

## Create Module

::: tip
Context Menu - [Project Path/src/module]: `Zova Create/Module`

Context Menu - [Project Path/src/module-vendor]: `Zova Create/Module`

Context Menu - [Project Path/src/suite/suite-name/modules]: `Zova Create/Module`

Context Menu - [Project Path/src/suite-vendor/suite-name/modules]: `Zova Create/Module`
:::

Enter the module name according to the prompt, such as `test-home`, and the VSCode extension will automatically create the code skeleton of the module
