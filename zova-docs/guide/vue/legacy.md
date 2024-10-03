# Legacy Usage

Zova adheres to the concept of progressive development. If the logic of some Vue components is relatively simple, or if you want to use the old Vue component code, you can directly use SFC development as usual without introducing an IOC container

## Initialization code structure

Zova provides a file directory for centralized management of legacy code. The directory name is `{Project}/src/legacy`, if it does not exist, you need to initialize it first

::: tip
Context Menu - [Project Path]: `Zova Init/Legacy`
:::

VSCode extension will automatically create three directory: composables, components, and pages. You can also add other directory as needed

### Alias Path

You can access the resources in the legacy directory through the alias path

| Alias Path    | Real Path              |
| ------------- | ---------------------- |
| @             | src/legacy             |
| @/composables | src/legacy/composables |
| @/components  | src/legacy/components  |
| @/pages       | src/legacy/pages       |
