# Module

## Why need Modularization?

May you agree with such an architectural concept: if you want to avoid `shit mountains`, then put `shit` into boxes.

In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Cabloy-Front introduces modularization.

## Benefits of Modularization

### For Business

1. **Business decoupling**: clear code structure and fully decoupled business logic
2. **Business logic reuse**: Taking modules as development units, it is convenient to deposit technical assets and reuse them in different systems
3. **Team development**: the business system is divided into modules, which is conducive to the decomposition and allocation of development tasks

### For Code

4. **Namespace isolation**: the namespace isolation mechanism of the module helps to reduce the mental burden during development. When we name variables for resources such as component, config and so on in the module, we don’t have to worry that this name will conflict with other modules, which can also make variable naming more concise and natural
5. **Building bundle more easier**: In Cabloy-Front, a module is a natural bundle boundary, and automatically packaged into an independent asynchronous bundle When building

## Naming Convention

To achieve namespace isolation, Cabloy-Front introduces the following naming convention for modules:

```bash
FullName: cabloy-module-front-{providerId}-{moduleName}
ShortName: {providerId}-{moduleName}
```

## Create Module

You can use the cli command to create a module file skeleton, such as creating a new module `test-home`:

```bash
$ cabloy front:create:module test-home
```
