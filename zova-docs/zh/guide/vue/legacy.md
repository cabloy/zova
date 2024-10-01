# 传统写法

Zova 奉行渐进式开发的理念。如果某些 Vue 组件逻辑比较简单，或者想利用旧的 Vue 组件代码，那么直接像通常一样使用 SFC 开发即可，不必引入 IOC 容器

## 初始化代码结构

Zova 专门提供了一个文件目录，用于集中管理传统代码。目录名称为`{project}/src/legacy`，如果不存在，需要先进行初始化

::: tip
右键菜单 - [项目路径/src]: `Zova Init/Legacy`
:::

VSCode 插件默认会自动创建三个目录：composables，components 和 pages，也可以根据需要自行添加其他目录

## 目录别名

可以通过目录别名访问 legacy 目录中的资源

| 别名          | 实际路径               |
| ------------- | ---------------------- |
| @             | src/legacy             |
| @/composables | src/legacy/composables |
| @/components  | src/legacy/components  |
| @/pages       | src/legacy/pages       |
