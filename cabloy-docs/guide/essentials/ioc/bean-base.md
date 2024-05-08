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
| $event | Global event object                                                             |
| $icon  | Icon function to obtain typed icon name                                         |

## Extended Members

When a project is created, there will be some modules present in the project, providing us with basic capabilities for further development

| Name    | Description                                 |
| ------- | ------------------------------------------- |
| $api    | Api object provided by module `a-homeapi`   |
| $router | Router object provided by module `a-router` |
| $route  | Route object provided by module `a-router`  |

Cabloy-Front can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box. Different UI libraries will also inject objects into the `BeanBase` base class according to their own needs

| 名称     | 说明                                      |
| -------- | ----------------------------------------- |
| $antdv   | Provided by module `a-antdv` of Antdv     |
| $q       | Provided by module `a-quasar` of Quasar   |
| $vuetify | Provided by module `a-vuetify` of Vuetify |
