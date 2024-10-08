# 组件(高级)

## 泛型组件

Zova 支持泛型组件。只需将已创建的子组件转换为泛型组件即可，以`card`子组件为例:

::: tip
右键菜单 - [模块路径/src/component/card]: `Zova Refactor/Convert to Generic Component`
:::

## 如何引用子组件实例

在 Zova 中，不使用`Template Ref`引用子组件实例，而是直接引用子组件对应的`controller bean`，这样可以支持更直观并且更强大的类型提示。参见：[Controller Ref](../../vue/refs.md#controller-ref)

## 添加更多Render Bean

如果一个组件涉及的业务复杂，渲染代码太多，可以添加更多的 Render Bean，实现代码的拆分，从而方便阅读和维护

::: tip
右键菜单 - [模块路径/src/page/card]: `Zova Refactor/Create Another Render Bean`

右键菜单 - [模块路径/src/component/card]: `Zova Refactor/Create Another Render Bean`
:::

## 添加更多Style Bean

同理，也可以添加更多的 Style Bean

::: tip
右键菜单 - [模块路径/src/page/card]: `Zova Refactor/Create Another Style Bean`

右键菜单 - [模块路径/src/component/card]: `Zova Refactor/Create Another Style Bean`
:::

## 渐进式开发

Zova 奉行渐进式开发的理念。如果某些 Vue 组件逻辑比较简单，或者想利用旧的 Vue 组件代码，那么直接像通常一样使用 SFC 开发即可，不必引入 IOC 容器

- 参见：[传统写法](../../vue/legacy.md)
