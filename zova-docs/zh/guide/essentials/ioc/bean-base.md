# BeanBase

`BeanBase` 是所有 bean 的基类。通过继承自`BeanBase`，我们可以在书写代码时便利的访问到常用的工具和能力

`BeanBase`本身提供了一些`内置成员`，也允许其他模块通过`monkey`机制注入`扩展成员`

## 内置成员

| 名称   | 说明                                        |
| ------ | ------------------------------------------- |
| app    | 全局 App 对象                               |
| ctx    | 当前 bean 实例所归属的 Context 对象         |
| bean   | 当前 bean 实例所归属的 bean 容器            |
| scope  | 当前 bean 实例所归属模块的 Scope 对象       |
| $el    | 当前 bean 实例所归属 Vue 组件的 dom element |
| $text  | I18n 语言资源翻译函数                       |
| $event | 全局事件对象                                |
| $icon  | 图标函数，获取类型化的图标名称              |

## 扩展成员

当创建好一个项目时，项目中就会存在一些模块，为我们进一步开发提供了基础能力

| 名称    | 说明                             |
| ------- | -------------------------------- |
| $api    | 由模块`home-api`提供的api对象   |
| $router | 由模块`a-router`提供的router对象 |

Zova 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用。不同的 UI 库也会根据自身需要向`BeanBase`基类注入对象

| 名称     | 说明                           |
| -------- | ------------------------------ |
| $antdv   | 由Antdv的模块`a-antdv`提供     |
| $q       | 由Quasar的模块`a-quasar`提供   |
| $vuetify | 由Vuetify的模块`a-vuetify`提供 |
