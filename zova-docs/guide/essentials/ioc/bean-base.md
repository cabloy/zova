# BeanBase

`BeanBase` is the base class for all beans. By inheriting from `BeanBase`, we can easily access commonly used tools and capabilities when writing code

`BeanBase` itself provides some built-in members and allows other modules to inject extended members through the `monkey` mechanism

## Built-in Members

| Name   | Description                                                                     |
| ------ | ------------------------------------------------------------------------------- |
| app    | Global App object                                                               |
| ctx    | The Context object which the current bean instance belongs to                   |
| bean   | The bean container which the current bean instance belongs to                   |
| scope  | The Scope object of the module which the current bean instance belongs to       |
| $el    | The dom element of the Vue component which the current bean instance belongs to |
| $text  | I18n translation function                                                       |
| $event | Global event object                                                             |

## Page Component

| Name    | Description             |
| ------- | ----------------------- |
| $params | Typed params parameters |
| $query  | Typed query parameters  |

## Child Component

| Name   | Description |
| ------ | ----------- |
| $props | props       |
| $emit  | emit        |
| $slots | slots       |
| $attrs | attrs       |

## Extended Members

When a project is created, there will be some modules present in the project, providing us with basic capabilities for further development

| Name                                                    | Description                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------- |
| [$api](../../techniques/api/introduction.md)            | Api object provided by module `home-api`                    |
| [$class](../../techniques/css-in-js/class.md)           | Global style object provided by module `home-style`         |
| [$component](../scope/component.md)                     | Global child components provided by module `home-component` |
| [$pinia](../../vue/pinia.md)                            | Pinia object provided by module `a-pinia`                   |
| [$queryClient](../../techniques/model/introduction.md)  | QueryClient object provided by module `a-model`             |
| [$router](../../techniques/router/navigation-guards.md) | Router object provided by module `a-router`                 |
| [$style](../../techniques/css-in-js/style.md)           | Style method provided by module `a-style`                   |
| [$theme](../../techniques/css-in-js/theme.md)           | Theme object provided by module `a-style`                   |
| [$token](../../techniques/css-in-js/token.md)           | Token object provided by module `a-style`                   |

Zova can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box. Different UI libraries will also inject objects into the `BeanBase` base class according to their own needs

| 名称     | 说明                                      |
| -------- | ----------------------------------------- |
| $antdv   | Provided by module `a-antdv` of Antdv     |
| $q       | Provided by module `a-quasar` of Quasar   |
| $vuetify | Provided by module `a-vuetify` of Vuetify |
