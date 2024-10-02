# 组件(高级)

## 泛型组件

## v-model

## 如何引用子组件实例

在 Zova 中，不使用`Template Ref`引用子组件实例，而是直接引用子组件对应的`controller bean`，这样可以实现更直观并且更强大的类型提示。参见：[Controller Ref](../../vue/refs.md#controller-ref)

## 渐进式开发

Zova 奉行渐进式开发的理念。如果某些 Vue 组件逻辑比较简单，或者想利用旧的 Vue 组件代码，那么直接像通常一样使用 SFC 开发即可，不必引入 IOC 容器

- 参见：[传统写法](../../vue/legacy.md)
