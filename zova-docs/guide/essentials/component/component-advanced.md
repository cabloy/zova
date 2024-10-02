# Component(Advanced)

## Generic Component

Zova supports generic components. Simply convert the created child component to a generic component. Take the `card` child component as an example:

::: tip
Context Menu - [Module Path/src/component/card]: `Zova Refactor/Convert to Generic Component`
:::

## How to refer to child component instance?

In Zova, `Template Ref` is not used to refer to child component instances, but directly refers to the `controller bean` corresponding to the child component, which can achieve more intuitive and stronger Typescript typing support. See: [Controller Ref](../../vue/refs.md#controller-ref)

## Add more Render Beans

If a component involves complex business and too much rendering code, you can add more Render Beans to split the code for easier reading and maintenance

### Page Component

::: tip
Context Menu - [Module Path/src/page/card]: `Zova Refactor/Create Another Render Bean`
:::

### Child Component

::: tip
Context Menu - [Module Path/src/component/card]: `Zova Refactor/Create Another Render Bean`
:::

## Add more Style Beans

Similarly, you can add more Style Beans

### Page Component

::: tip
Context Menu - [Module Path/src/page/card]: `Zova Refactor/Create Another Style Bean`
:::

### Child Component

::: tip
Context Menu - [Module Path/src/component/card]: `Zova Refactor/Create Another Style Bean`
:::

## Progressive development

Zova adheres to the concept of progressive development. If the logic of some Vue components is relatively simple, or if you want to use the old Vue component code, you can directly use SFC development as usual without introducing an IOC container

- See: [Legacy Usage](../../vue/legacy.md)
