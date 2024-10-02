# Component(Advanced)

## How to refer to child component instance?

In Zova, `Template Ref` is not used to refer to child component instances, but directly refers to the `controller bean` corresponding to the child component, which can achieve more intuitive and stronger Typescript typing support. See: [Controller Ref](../../vue/refs.md#controller-ref)

## Progressive development

Zova adheres to the concept of progressive development. If the logic of some Vue components is relatively simple, or if you want to use the old Vue component code, you can directly use SFC development as usual without introducing an IOC container

- See: [Legacy Usage](../../vue/legacy.md)
