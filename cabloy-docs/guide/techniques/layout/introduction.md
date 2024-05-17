`layout` can specify layout component for this route. If `layout` is not set, the default layout component will be used

### System layout components

The system provides two layout components: `empty` and `default`:

| Name    | Description                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| empty   | Empty layout, generally used to display system pages such as Login                                                                         |
| default | The default layout generally provides areas such as Header, Sidebar, and Footer, and page components will be displayed in the Content area |

### Custom layout components

The `empty` and `default` layout components are located in the module `a-homelayout`, and we can modify them according to business needs
