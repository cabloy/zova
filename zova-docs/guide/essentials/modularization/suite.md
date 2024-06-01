# Suite

## Origin of Suite

As the project continues to evolve iteratively, the business modules created will also expand. In addition, for some business scenarios, multiple modules are often required to be implemented together. To solve the above problems, Cabloy-Front introduces the concept of suite. In short, a suite is a combination of a group of business modules, often corresponding to a specific business scenario, such as `e-commerce`, `CRM`, `supply chain`, and so on.

## Naming Convention

The suite uses a naming convention similar to the module:

```bash
FullName: zova-suite-{providerId}-{suiteName}
ShortName: {providerId}-{suiteName}
```

## Directory Structure

A suite is a combination of a group of business modules, so the directory structure is also very simple. Take the suite `a-home` as an example:

```bash
a-home
├── modules
│   ├── a-home
│   ├── home-api
│   ├── home-icon
│   ├── home-layout
│   ├── home-mock
│   ├── home-pagesystem
│   ├── home-router
│   └── ...
└── package.json
```

## Create Suite

You can use the cli command to create a suite file skeleton, such as creating a new suite `test-home`:

```bash
$ cabloy front:create:suite test-home
```
